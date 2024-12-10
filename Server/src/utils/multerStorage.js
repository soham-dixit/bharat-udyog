import multer from "multer";
import path from "path";

// Multer setup
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // specify the directory where files will be stored
    console.log("created");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
    console.log(uniqueSuffix);
  },
});
