import express, { Application, Request, Response } from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { faker } from "@faker-js/faker";

const User = require("./models/user.model");
const UserActivity = require("./models/userActivity.model");
const RandomUser = require("./models/randomUser.model");

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

async function createAndUploadRandomUsers() {
  const generatedIds = new Set();

  function createRandomUser() {
    let idNumber;
    do {
      idNumber = faker.number.int({ min: 100, max: 200 });
    } while (generatedIds.has(idNumber));

    generatedIds.add(idNumber);

    return {
      IdNumber: idNumber,
      fullName: faker.person.fullName(),
    };
  }

  const users = faker.helpers.multiple(createRandomUser, {
    count: 50,
  });

  try {
    console.log("CREATING USERS....");
    const response = await RandomUser.create(users);
    console.log("Response: ", response);
    console.log("----------- USERS CREATED -----------");
  } catch (error) {
    console.log("Error in createRandomUsers: ", error);
  }
}

async function checkIfUserIsInRandomUserDatabase(
  IdNumber: number,
  name: string
): Promise<any> {
  try {
    const user = await RandomUser.findOne({ IdNumber });

    if (user) {
      const userFullNameWords = user.fullName.toLowerCase().split(" ").sort();
      const inputNameWords = name.toLowerCase().split(" ").sort();

      // Check if both arrays contain the same words
      if (
        JSON.stringify(userFullNameWords) === JSON.stringify(inputNameWords)
      ) {
        return user;
      }
    }
    return null;
  } catch (error) {
    console.log("Error in checkIfUserIsInRandomUserDatabase: ", error);
    return null;
  }
}

// Create a user
app.post("/api/createUser", async (req: Request, res: Response) => {
  const { name, IdNumber, mobileNumber, email } = req.body;
  const userFound = await checkIfUserIsInRandomUserDatabase(IdNumber, name);

  // If there is no user return
  if (!userFound)
    return res
      .status(404)
      .json({ message: "User with such details does not exist" });

  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error: any) {
    console.log("Error: ", error);
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
  } catch (error: any) {
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
    const existingLog = await UserActivity.findOne({
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
    const time = await UserActivity.create({
      userID,
    });

    res.status(200).json(time);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update the user's latitude and longitude
app.post("/api/updateLocation", async (req, res) => {
  try {
    const { userID, latitude, longitude } = req.body;

    console.log(
      `User: ${userID} is at latitude: ${latitude} and longitude: ${longitude}`
    );
    const userActivity = await UserActivity.findOne({ userID });
    if (!userActivity) {
      console.log("UserActivity not found");
      return;
    }

    const newLocation = {
      latitude,
      longitude,
      timestamp: new Date(),
    };

    userActivity.location.push(newLocation);
    await userActivity.save();

    console.log("Location updated successfully");

    res.status(200).json({ message: "User's location updated successfully" });
  } catch (error: any) {
    console.log("Error in /api/updateLocation: ", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/logLogOutTime", async (req, res) => {
  try {
    const { userID } = req.body;

    // Find the most recent login record for the user
    const loginRecord = await UserActivity.findOne({ userID }).sort({
      loginTime: -1,
    });

    if (!loginRecord || loginRecord.logoutTime) {
      return res.status(404).json({ message: "No active login session found" });
    }

    // Update the logout time
    loginRecord.logoutTime = new Date();
    await loginRecord.save();

    console.log("Logged out");

    res.status(200).json(loginRecord);
  } catch (error: any) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
});

connect(MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    createAndUploadRandomUsers();
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });
