import { request } from "https";
import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Product";
const PaytmCheckSum = require("paytmchecksum");
import pincode from "../../pincode.json";
import { resolve } from "path";


const handler = async (req, res) => {
  if (req.method == "POST") {
    // check if the pincode is serviceable
    if (!Object.keys(pincode).includes(req.body.pincode)) {
      res.status(200).json({
        success: false,
        error: "The pincode is you entered is not serviceable!",
        cartClear: false,
      });
      return;
    }

    // check if the cart is tempered with
    let product,
      sumTotal = 0;
    let cart = req.body.cart;
    if (req.body.subTotal <= 0) {
      res.status(200).json({
        success: false,
        error: " Cart empty!Please build your cart and try again",
        cartClear: false,
      });
      return;
    }
    for (let item in cart) {
      // console.table(item);
      sumTotal += cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });
      // check if the cart item is out of stock
      if (product.availableQty < cart[item].qty) {
        res.status(200).json({
          success: false,
          error: "Some Items in Your Cart🛒 are Out of Stock🏪",
          cartClear: true,
        });
        return;
      }
      if (product.price !== cart[item].price) {
        console.log(cart[item].price);
        res.status(200).json({
          success: false,
          error:
            "The price of Item in Your Cart has been attempted to changed. Pls Try Again",
          cartClear: true,
        });
        return;
      }
    }
    if (sumTotal !== req.body.subTotal) {
      res.status(200).json({
        success: false,
        error:
          "the price of the some items in your cart have changed. Please try again later",
        cartClear: true,
      });
      return;
    }

    // check if the detials are valid

    if (
      req.body.phone.length !== 10 ||
      !Number.isInteger(Number(req.body.phone))
    ) {
      res.status(200).json({
        success: false,
        error: "Please enter your 10 digit phone number",
        cartClear: false,
      });
      return;
    }
    if (
      req.body.pincode.length !== 6 ||
      !Number.isInteger(Number(req.body.pincode))
    ) {
      res.status(200).json({
        success: false,
        error: "Please enter your 6 digit pin code",
        cartClear: false,
      });
      return;
    }

    // Initiate an coressponding to this order id
    let order = new Order({
      email: req.body.email,
      name: req.body.name,
      orderId: req.body.oid,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      phone:req.body.phone,
      amount: 30, //updated very soon by req.body.subTotal
      products: req.body.cart,
    });
    await order.save();

    // insert an entry in the orders table with status as pending
    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websiteName: "YOUR_WEBSITE_NAME",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    /*
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    const checksum = await PaytmCheckSum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.NEXT_PUBLIC_PAYTM_MKEY
    );
    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);
    const requestAsync = async () => {
      return new Promise((reslove, rejects) => {
        var options = {
          /* for Staging */
          hostname: "securegw.paytm.in" /* for Production */, // hostname: 'securegw.paytm.in',

          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,

          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };
        var response = "";
        var post_req = request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            // console.log("Response: ", response);
            let ress = JSON.parse(response).body;
            ress.success = true;
            ress.cartClear = false;

            resolve(ress);
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    };
    let myr = requestAsync();
    res.status(200).json(myr);
  }
};
export default connectDb(handler);
