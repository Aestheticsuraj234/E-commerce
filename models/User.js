import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    pincode: { type: String },
    phone: { type: String },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("User", UserSchema);
