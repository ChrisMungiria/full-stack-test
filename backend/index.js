const express = require("express");

require("dotenv").config();
const dotenv = require("dotenv");

const mongoose = require("mongoose");
const User = require("./models/user.model");

const app = express();
app.use(express.json());

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

// Find a user by ID
app.get("/api/getUser/:IdNumber", async (req, res) => {
  try {
    const { IdNumber } = req.params;
    const user = await User.findOne({ IdNumber: IdNumber });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
