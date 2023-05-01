const Score = require("../models/score");
const User = require("../models/user");

exports.getRanking = async (req, res) => {
  try {
    const snakeRanking = await Score.find({ game: "snake" })
      .sort({ score: -1 })
      .limit(5);

    const memoryRanking = await Score.find({ game: "memory" })
      .sort({ score: -1 })
      .limit(5);

    const tetrisRanking = await Score.find({ game: "tetris" })
      .sort({ score: -1 })
      .limit(5);

    const breakbricsRanking = await Score.find({ game: "breakbrics" })
      .sort({ score: -1 })
      .limit(5);

    const ranking = {
      snake: snakeRanking,
      memory: memoryRanking,
      tetris: tetrisRanking,
      breakbrics: breakbricsRanking,
    };

    res.status(200).json(ranking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getScoreByPlayerId = async (req, res) => {
  try {
    const playerId = req.user.userId;

    const snakeScores = await Score.find({ playerId: playerId, game: "snake" })
      .sort({ score: -1 })
      .limit(5);

    const memoryScores = await Score.find({
      playerId: playerId,
      game: "memory",
    })
      .sort({ score: -1 })
      .limit(5);

    const tetrisScores = await Score.find({
      playerId: playerId,
      game: "tetris",
    })
      .sort({ score: -1 })
      .limit(5);

    const breakbricsScores = await Score.find({
      playerId: playerId,
      game: "breakbrics",
    })
      .sort({ score: -1 })
      .limit(5);

    const scores = {
      snake: snakeScores,
      memory: memoryScores,
      tetris: tetrisScores,
      breakbrics: breakbricsScores,
    };

    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addScore = async (req, res) => {
  const { game, time, score } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    const newScore = new Score({
      playerId: req.user.userId,
      playerName: user.username,
      game,
      time,
      score,
    });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
