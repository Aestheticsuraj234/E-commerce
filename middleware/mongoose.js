import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
  if (mongoose.connection.readyState) {
    console.log("Mongo is connected")
    return handler(req, res);
  }
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error connecting to database" });
  }
};

export default connectDb;
