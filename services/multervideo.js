const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./storage/videos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const fileFilter = function (req, file, cb) {
  // Check the file type to allow only certain image file extensions
  if (file.mimetype === "video/mp4") {
    cb(null, true);
  } else {
    cb(new Error("mp4 Videos are allowed."));
  }
};


const uploadVideo = multer({ storage: storage, fileFilter: fileFilter  });

module.exports = uploadVideo;