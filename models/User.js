const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, default: "" },

    address: { type: String, default: "" },

    pincode: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("User", UserSchema);
