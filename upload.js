const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    },
    limits: {
      fileSize: 1048576,
  },
});

const upload = multer({ storage });

module.exports = upload;
