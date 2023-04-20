const Job = require("../models/jobs");
const User = require("../models/user");
const JobApplication = require("../models/jobApplication");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const applyJob = async (req, res) => {
  console.log("req.body__applyJob", req.body);
  try {
    const jobId = req.body.id;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(jobId);

    if (!isValidObjectId) {
      return res.status(404).json({ message: "Invalid job ID" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const publisher = await User.findById(job.publisher);
    if (!publisher) {
      return res.status(404).json({ message: "Publisher not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-password",
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: publisher.email,
      subject: `New application for job "${job.jobTitle}"`,
      html: `
        <p>Dear ${publisher.firstName},</p>
        <p>A new candidate has applied for the job "${job.jobTitle}".</p>
        <p>Name: ${req.body.firstName} ${req.body.lastName}</p>
        <p>Email: ${req.body.email}</p>
        <p>Message: ${req.body.message}</p>
        <p>Date: ${new Date().toLocaleDateString()}</p>
      `,
    };

    if (req.file) {
      const attachment = {
        filename: req.file.filename,
        path: req.file.path,
      };
      mailOptions.attachments = [attachment];
    }

    if (!req.file && job.cvRequired) {
      return res.status(400).json({ message: "File attachment is required" });
    }

    const jobApplication = new JobApplication({
      selectedJob: jobId,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      messsage: req.body.message,
      createdAt: new Date(),
    });

    await jobApplication.save();

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent: " + info.response);

        return res.json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function requests(req, res) {
  try {
    const userId = req.user.userID;
    const jobs = await Job.find({ publisher: userId }).exec();
    const jobIds = jobs.map((job) => job._id);
    const jobApplications = await JobApplication.find({
      selectedJob: { $in: jobIds },
    }).exec();
    res.status(200).json({ applications: jobApplications });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get job applications for user");
  }
}

module.exports = { applyJob, requests };
