// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Product";
import PaytmChecksum from "paytmchecksum";
const handler = async (req, res) => {
  let order;

  // validate paytm check sum

  var paytmChecksum = "";
  var paytmParams = {}
  const received_data = req.body;

  var isValidChecksum = PaytmChecksum.verifySignature(paytmParams, process.env.NEXT_PUBLIC_PAYTM_MKEY, paytmChecksum); //add paytm merchhant key later
  if (!isValidChecksum) {
    console.log("Checksum Matched");
    res.status(500).send("Some error occured")
    return
    
  } 


  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Paid❤", paymentInfo: JSON.stringify(req.body),transactionid:req.body.TXNID }
    );
    let products = order.products;
    for (let slug in products) {
     
      await Product.findOneAndUpdate(
        { slug: slug },
        { $inc: { availableQty: - products[slug].qty } }
      );
    }
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Pedning😂", paymentInfo: JSON.stringify(req.body),transactionid:req.body.TXNID }
    );
  }
// Get the transaction ID of the order

  res.redirect("/order?clearCart=1&id=" + order._id, 200);
  //
  // res.status(200).json({ body: req.body });
};

export default connectDb(handler);
