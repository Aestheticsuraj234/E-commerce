import connectDb from "../../middleware/mongoose";
import Image from "../../models/Image";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { imageName, buffer, mimetype } = req.file;
      const image = new Image({
        name: imageName,
        data: buffer,
        contentType: mimetype,
      });
      await image.save();
      res.status(201).json({ message: "Image uploaded successfully", image });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Upload failed", error });
    }
  }
};

export default connectDb(upload.single("image"))(handler);
