const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Image", ImageSchema);
