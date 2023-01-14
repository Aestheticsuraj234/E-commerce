// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";
const handler = async (req, res) => {
  if (req.method == "POST") {
    const { ...form } = req.body;
    let p = new Product({
      title: form.title,
      slug: form.slug,
      threads: form.threads,
      reeds: form.reeds,
      color: form.color,
      density: form.density,
      category: form.category,
      img: form.img,
      madeIn: form.madeIn,
      price: form.price,
      description: form.description,
      availableQty: form.availableQty,
    });
    await p.save();
    console.log(p);

    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};
export default connectDb(handler);
