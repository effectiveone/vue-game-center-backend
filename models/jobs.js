const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  technologies: [
    {
      name: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: [
          "Beginner",
          "Intermediate",
          "Advanced",
          "beginner",
          "intermediate",
          "advanced",
        ],
        required: true,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  locations: {
    type: [String],
    required: true,
  },
  publisher: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applicationId: {
    type: mongoose.Types.ObjectId,
    ref: "Application",
    default: null,
  },
});

module.exports = mongoose.model("Job", jobSchema);
