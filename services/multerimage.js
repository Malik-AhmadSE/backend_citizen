const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./storage/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const fileFilter = function (req, file, cb) {
  // Check the file type to allow only certain image file extensions
  if (file.mimetype === "image/jpeg" ||file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG and PNG images are allowed."));
  }
};


const uploadImage = multer({ storage: storage, fileFilter: fileFilter  });

module.exports = uploadImage;
