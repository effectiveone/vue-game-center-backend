const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only PDF is allowed"), false);
  }
};

const limits = {
  fileSize: 1024 * 1024, // 1 MB
};

const upload = multer({ fileFilter, limits }).single("cv");

const validateCV = (req, res, next) => {
  console.log("przehodze walidacje verifyToken");

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

module.exports = { validateCV };
