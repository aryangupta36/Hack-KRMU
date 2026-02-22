const router = require("express").Router();
const fs = require("fs");
const axios = require("axios");
const { v4 } = require("uuid");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "UserProfilePics/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// middleware to handle profile picture uploads, save it in UserProfilePics folder
const upload = multer({ storage: storage });

// User registration and login routes
router.post("/register", upload.single("profilePic"), (req, res) => {
  try {
    const { username, phone } = req.body;

    if (!username || !phone) {
      return res
        .status(400)
        .json({ error: "Username and phone number are required" });
    }

    let users = [];

    if (fs.existsSync("data/user.json")) {
      const fileContent = fs.readFileSync("data/user.json", "utf8");
      if (fileContent.trim()) {
        users = JSON.parse(fileContent);
      }
    }

    const existingUser = users.find((u) => u.phone === phone);

    if (existingUser) {
      return res.status(400).json({ error: "Phone number already registered" });
    }

    const userId = v4();

    const newUser = {
      userId,
      username,
      phone,
      profilePic: req.file ? req.file.filename : null,
    };

    users.push(newUser);

    fs.writeFileSync("data/user.json", JSON.stringify(users, null, 2));

    req.session.userId = userId;

    res.json({
      message: "User registered successfully",
      userId,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Registration failed", details: err.message });
  }
});

// User login route
router.post("/login", (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    if (!fs.existsSync("data/user.json")) {
      return res.status(404).json({ error: "No users registered yet" });
    }

    const users = JSON.parse(fs.readFileSync("data/user.json"));
    const user = users.find((u) => u.phone === phone);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Set user ID in session
    req.session.userId = user.userId;
    res.json({ message: "Login successful", userId: user.userId });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

// store preferred language in session for personalized advice in that language
router.post("/set-language", (req, res) => {
  try {
    const { language } = req.body;

    if (!language) {
      return res.status(400).json({ error: "Language is required" });
    }

    req.session.language = language;
    res.json({ message: "Language set successfully", language });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to set language", details: err.message });
  }
});

// store location {lattitude and longitude} in session for personalized advice based on location
router.post("/set-location", (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    req.session.lat = lat;
    req.session.lng = lng;
    res.json({ message: "Location set successfully", lat, lng });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to set location", details: err.message });
  }
});

// helper: reverse geocode lat,lng using Nominatim (OpenStreetMap)
async function reverseGeocode(lat, lng) {
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/reverse",
    {
      params: {
        lat: lat,
        lon: lng,
        format: "json",
        addressdetails: 1,
      },
      headers: {
        "User-Agent": "crop-doctor-app/1.0 (ritesh.kumar.24cse@gmail.com)",
        "Accept-Language": "en",
      },
      timeout: 5000,
    }
  );

  return response.data;
}


// GET current stored location (reverse geocoded)
router.post("/location", async (req, res) => {
  const { lat, lng } = req.body;

  const data = await reverseGeocode(lat, lng);

  res.json({
    displayName: data.display_name || null,
    address: data.address || null,
  });
});





module.exports = router;
