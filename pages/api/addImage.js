const multer = require("multer");
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error("Invalid file format. Only jpg, jpeg, png are allowed."),
        false
      );
    }
    cb(null, true);
  },
});
import connectDb from "../../middleware/mongoose";
import Image from "../../models/Image";
import { check } from "express-validator";
import { validationResult } from "express-validator";

const handler = async (req, res) => {
  connectDb();
  if (req.method === "POST") {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const image = req.file;
    const { imageName } = req.body;
    if (!imageName) {
      return res
        .status(400)
        .json({ errors: [{ msg: "imageName is required" }] });
    }
    const img = new Image({
      name: imageName,
      data: image,
      contentType: image.mimetype,
    });
    console.log(img);
  await  img.save();
    res.status(201).json({ success: "Image uploaded successfully" });
  }
};

export default upload.single('image') ([
  check('imageName').not().isEmpty().withMessage("imageName is required"),
  handler
  ])
