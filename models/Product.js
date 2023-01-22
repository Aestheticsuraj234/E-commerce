const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, //

    slug: { type: String, required: true, unique: true }, //

    description: { type: String, required: true }, //

    img: { type: String, required: true }, //

    category: { type: String, required: true }, //

    madeIn: { type: String, required: true }, //

    reeds: { type: String }, //

    density: { type: String },

    threads: { type: String, },

    color: { type: String }, //

    price: { type: String, required: true }, //

    availableQty: { type: String, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};

export default mongoose.model("product", ProductSchema);
