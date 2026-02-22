const router = require("express").Router();
const path = require("path");
const multer = require("multer");

// Helper function to save images in uploads folder
// ensure uploads directory exists

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    const form = new FormData();
    form.append("file", fs.createReadStream(req.file.path));

    const response = await axios.post(
      "http://localhost:8000/predict",
      form,
      { headers: form.getHeaders() }
    );

    res.json(response.data);

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "ML prediction failed" });
  }
});

module.exports=router;