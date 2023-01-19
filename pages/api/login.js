// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken');



const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
    let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedData) {
          if(user.role === 'admin'){
              var token = jwt.sign({ success: true, email: user.email, name: user.name, role: 'admin' }, process.env.JWT_SECRET,{
              expiresIn:"2d"
              });
              res.status(200).json({success:true,token,email:user.email, role:'admin'});
          } else if(user.role === 'user'){
              var token = jwt.sign({ success: true, email: user.email, name: user.name, role: 'user' }, process.env.JWT_SECRET,{
              expiresIn:"2d"
              });
              res.status(200).json({success:true,token,email:user.email, role:'user'});
          }
      } else {
        res.status(200).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(200).json({ success: false, error: "No user Found" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};
export default connectDb(handler);
