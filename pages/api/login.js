// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken');



const handler = async (req, res) => {
  if (req.method == "POST") {
    console.table(req.body);
    let user = await User.findOne({ email: req.body.email });
    const bytes = CryptoJS.AES.decrypt(user.password, "secret123");
    let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedData) {
        var token = jwt.sign({ success: true, email: user.email, name: user.name }, 'jwtsecret',{
          expiresIn:"2d"
        });
        res
          .status(200)
          .json({success:true,token})
      } else {
        res.status(200).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(200).json({ success: false, error: "No user Found" });
    }
  } else {
    res.status(400).json({ error: "THis method is not allowed" });
  }
};
export default connectDb(handler);
