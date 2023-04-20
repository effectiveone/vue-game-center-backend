const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");

require("dotenv").config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

const routes = fs
  .readdirSync("./routes")
  .filter((file) => file !== "authRoutes.js")
  .map((file) => {
    const fileName = file.replace(".js", "");
    const routePath = fileName === "jobsRoutes" ? "/" : `/${fileName}`;
    return { path: routePath, router: require(`./routes/${fileName}`) };
  });

// Use routes
routes.forEach((route) => app.use(route.path, route.router));

// Use authRoutes
app.use("/api/auth", require("./routes/authRoutes"));

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database connection failed. Server not started");
    console.error(err);
  });
