// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    await User.findOneAndUpdate(
      { email: user.email },
      {
        name: req.body.name,
        address: req.body.address,
        pincode: req.body.pincode,
        phone: req.body.phone,
      }
    );
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "Error" });
  }
};
export default connectDb(handler);
