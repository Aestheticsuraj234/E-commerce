// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";
const handler = async (req, res) => {
  let products = await Product.find();
  let carpets = {};

  for (let item of products) {
    if (item.title in carpets) {
      if (
        !carpets[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        carpets[item.title].color.push(item.color);
      }
      if (
        !carpets[item.title].reeds.includes(item.reeds) &&
        item.availableQty > 0
      ) {
        carpets[item.title].reeds.push(item.reeds);
      }
      if (
        !carpets[item.title].threads.includes(item.threads) &&
        item.availableQty > 0
      ) {
        carpets[item.title].threads.push(item.threads);
      }
    } else {
      carpets[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        carpets[item.title].color = [item.color];
        carpets[item.title].reeds = [item.reeds];
        carpets[item.title].threads = [item.threads];
      }
    }
  }
  res.status(200).json({ carpets });
};
export default connectDb(handler);
