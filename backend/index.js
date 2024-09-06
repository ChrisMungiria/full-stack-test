const express = require("express");

require("dotenv").config();
const dotenv = require("dotenv");

const mongoose = require("mongoose");

const cors = require("cors");
const Times = require("./models/times.model");
const User = require("./models/user.model");

const app = express();
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Create a user
app.post("/api/createUser", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Find a user by Phone Number
app.get("/api/getUser/:mobileNumber", async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    const user = await User.findOne({ mobileNumber: mobileNumber });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Log the user log in time
app.post("/api/logLogInTime", async (req, res) => {
  try {
    const { userID } = req.body;

    // Get the current date without time
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Check if the user has logged in today
    const existingLog = await Times.findOne({
      userID,
      loginTime: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
    if (existingLog) {
      return res
        .status(200)
        .json({ message: "User has already logged in today" });
    }

    // Log the current time
    const time = await Times.create({
      userID,
    });
    res.status(200).json(time);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update the user's latitude and longitude
app.post("/api/updateLocation", async (req, res) => {
  try {
    const { userID, latitude, longitude } = req.body;

    console.log(
      `User: ${userID} is at latitude: ${latitude} and longitude :${longitude}`
    );

    res.status(200).json({ message: "User's location updated successfully" });
  } catch (error) {
    console.log("Error in /api/updateLocation: ", error);
  }
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });
