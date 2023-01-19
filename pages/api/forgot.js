import jwt from "jsonwebtoken";
import config from "config";
import Forgot from "../../models/forgot"
import User from "../../models/User";
export default async function handler(req, res) {
  if (req.body.sendMail) {
    // check if the user exists in the database
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: "Email not found" });
    }
    // Generate a token
    const token = jwt.sign({ id: user._id }, config.get(process.env.JWT_SECRET), {
      expiresIn: 3600, // expires in 1 hour
    });
    let forgot = new Forgot({
      userid: user._id,
      email: req.body.email,
      token: token,
    });
    await forgot.save();
    // send an email to the user
    let email = `Dear ${user.name},
We have received a request to reset the password for your account. If you made this request, please click on the following link to reset your password:
${process.env.NEXT_PUBLIC_HOST}/forgot?token=${token}
If you did not request a password reset, you can safely ignore this email.
Thank you,
[Rollend]`;
    // Send email here
  } else {
    // Reset user Password
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: "Email not found" });
    }
    let forgot = await Forgot.findOne({ email: req.body.email });
    if (!forgot) {
      return res.status(400).json({ msg: "Invalid token" });
    }
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    // Send email to confirm password reset
    // ...
    // delete token from forgot schema
    await Forgot.deleteOne({ email: req.body.email });
  }
  res.status(200).json({ success: true });
}
