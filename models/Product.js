import { stringifyQuery } from "next/dist/server/server-route-utils";

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    slug: { type: String, required: true, unique: true },

    desc: { type: String, required: true },

    img: { type: String, required: true },

    category: { type: String, required: true },

    madeIn: { type: String, required: true },

    reeds: { type: String },

    density: { type: Number },

    threads: { type: String, required: true },

    color: { type: String },

    price: { type: Number, required: true },

    availableQty: { type: Number, required: true },
  },
  { timestamps: true }
);

mongoose.models = {}

export default mongoose.model("product", ProductSchema);
