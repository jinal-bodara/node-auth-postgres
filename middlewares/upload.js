import multer from 'multer';
import path from 'path'
require("dotenv/config")
export const upload = multer({

  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '_' + Date.now()
        + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)) {
      req.fileValidationError = "Only JPG OR PNG allowed!";
      return cb("Only .png and .jpg are allowed! ", false);
    }
    else if (file.size >= 1048576) {
      req.fileValidationError = "file size should be 10mb"
      return cb("file size should be 10mb", false);
    }
    cb(null, true);
  },
});

