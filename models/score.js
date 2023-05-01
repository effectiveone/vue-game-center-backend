const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  playerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  playerName: {
    type: String,
  },
  game: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
  },
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Score", scoreSchema);
