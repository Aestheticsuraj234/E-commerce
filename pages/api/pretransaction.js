import { request } from "https";
/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */
import PaytmChecksum from "./PaytmChecksum";
import { rejects } from "assert";
import { resolve } from "path";
export default async function handler(req, res) {
  var paytmParams = {};

  paytmParams.body = {
    requestType: "Payment",
    mid: process.env.PAYTM_MID,
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
  generateSignature(
    JSON.stringify(paytmParams.body),
    process.env.PAYTM_MID
  ).then(function (checksum) {
    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);
    const requestAsync = () => {
      return new Promise((reslove, rejects) => {
        var options = {
          /* for Staging */
          hostname: "securegw-stage.paytm.in" /* for Production */, // hostname: 'securegw.paytm.in',

          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MID}&orderId=${orderId}`,
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
            console.log("Response: ", response);
            resolve(response);
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    };
  });
}
