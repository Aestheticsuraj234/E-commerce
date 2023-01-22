import Product from "../../models/Product";
import mongoose from 'mongoose';

const handler = async (req, res) => {
  try {
    if (!mongoose.connections[0].readyState) {
      mongoose.connect(process.env.MONGO_URI);
    }

    let products = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          product: { $first: "$$ROOT" },
        },
      },
    ]);
    res.status(200).json({ products });
    console.log(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
export default handler;
