const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const jobController = require("../controllers/jobController");

// GET /api/jobs - pobierz wszystkie ogłoszenia pracy
router.get("/", jobController.getAllJobs);

// GET /api/jobs/:id - pobierz ogłoszenie pracy o danym ID
router.get("/:id", jobController.getUserJobs);

// POST /api/jobs - utwórz nowe ogłoszenie pracy
router.post("/", auth, jobController.addJob);

// PUT /api/jobs/:id - zaktualizuj ogłoszenie pracy o danym ID
router.put("/:id", auth, jobController.updateJob);

// DELETE /api/jobs/:id - usuń ogłoszenie pracy o danym ID
router.delete("/:id", auth, jobController.deleteJob);

module.exports = router;
