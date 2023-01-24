import Product from "../../models/Product";
import mongoose from 'mongoose';

const handler = async (req, res) => {
  try {
    if (!mongoose.connections[0].readyState) {
      mongoose.connect(process.env.MONGO_URI);
    }
    let limit = req.query.limit;
    if(!limit) {
      limit = 10;
    }
    if (isNaN(limit)) {
      return res.status(400).send({ message: 'Limit should be a number' });
    }
    const products = await Product.aggregate([{$sample: {size: parseInt(limit)}}]);
    res.status(200).json({products});
  } catch (error) {
    res.status(500).json({ message: "Error getting suggested products", error });
  }
};

export default handler;
