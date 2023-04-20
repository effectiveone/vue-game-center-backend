const Job = require("../models/jobs");
const User = require("../models/user");

// Dodawanie nowego ogłoszenia pracy
const addJob = async (req, res) => {
  try {
    const {
      companyName,
      jobTitle,
      technologies,
      description,
      rate,
      locations,
      creatorId,
    } = req.body;
    const job = new Job({
      companyName,
      jobTitle,
      technologies,
      description,
      rate,
      locations,
      publisher: req.user.userId ?? creatorId,
    });
    await job.save();
    res.status(201).json({ message: "Job added successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Pobieranie wszystkich ogłoszeń pracy
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Pobieranie ogłoszeń pracy dla konkretnego użytkownika
const getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ publisher: req.user.userId }).populate(
      "publisher",
      "username"
    );
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Modyfikacja ogłoszenia pracy
const updateJob = async (req, res) => {
  try {
    const { jobTitle, technologies, description, rate, locations } = req.body;
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.publisher.toString() !== req.user.userId) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this job" });
    }
    job.jobTitle = jobTitle || job.jobTitle;
    job.technologies = technologies || job.technologies;
    job.description = description || job.description;
    job.rate = rate || job.rate;
    job.locations = locations || job.locations;
    await job.save();
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Usuwanie ogłoszenia pracy
const deleteJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.publisher.toString() !== req.user.userId) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this job" });
    }
    await job.remove();
    res.status(200).json({ message: "Job deleted successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addJob, getAllJobs, getUserJobs, updateJob, deleteJob };
