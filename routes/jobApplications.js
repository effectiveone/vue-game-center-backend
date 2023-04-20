const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const applyJobController = require("../controllers/applyJobController");
const { validateCV } = require("../middleware/validateCV");

router.post(
  "/apply",
  auth,
  // validateCV,
  applyJobController.applyJob
);
router.get("/requests", auth, applyJobController.requests);

module.exports = router;
