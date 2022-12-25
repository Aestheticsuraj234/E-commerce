// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";
const handler = async (req, res) => {
  if (req.method == "POST") {
    console.table(req.body);
    for (let i = 0; i < req.body.length; i++) {
      let p = new Product({
        title: req.body[i].title,

        slug: req.body[i].slug,

        desc: req.body[i].desc,

        img: req.body[i].img,

        category: req.body[i].category,
        madeIn: req.body[i].madeIn,

        reeds: req.body[i].reeds,
        density: req.body[i].density,

        color: req.body[i].color,

        price: req.body[i].price,
        threads: req.body[i].threads,

        availableQty: req.body[i].availableQty,
      });
      await p.save();
    }
    res.status(200).json({ success: "sucess" });
  } else {
    res.status(400).json({ error: "THis method is not allowed" });
  }
};
export default connectDb(handler);
