// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import pincodes from "../../pincode.json";
import Forgot from "../../models/forgot";
// import forgot from "../../models/forgot";
import User from '../../models/User'
export default async function handler(req, res) {
  //  check if the user is exists in the data base
  if(req.body.sendMail){
  let token = `qudgdfhiufehvfueivhfiuvhuirhvfuhv`
  let forgot = new Forgot({
    userid:req.body.email,
    token:token
  })
  // send an email to the user
  let email = `Dear 
  ,
We have received a request to reset the password for your account. If you made this request, please click on the following link to reset your password:
${process.env.NEXT_PUBLIC_HOST/`forgot?token=${token}`}
If you did not request a password reset, you can safely ignore this email.
Thank you,
[Your Name]`;
  }
  else{
// Reset user Password
  }
  res.status(200).json({success: true});
}
