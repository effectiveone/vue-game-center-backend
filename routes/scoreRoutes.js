const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/scoreController");
const auth = require("../middleware/auth");

router.get("/", scoresController.getRanking);
router.get("/selectedPlayer", auth, scoresController.getScoreByPlayerId);
router.post("/", auth, scoresController.addScore);

module.exports = router;
