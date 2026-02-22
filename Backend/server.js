const express = require("express");
const session = require("express-session");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

require("dotenv").config();


// Initialize Express app
const app = express();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies (form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "lax",
      secure: false
    }
  })
);


// Helper function to save images in uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create the uploads directory if it doesn't exist
const upload = multer({ storage: storage });

// Routes
app.use("/diagnosis", require("./routes/diagnosis"));
app.use("/history", require("./routes/history"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/resources", require("./routes/resources"));
app.use("/user", require("./routes/user"));
app.use("/translate", require("./routes/translate"));

// routes
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use('/',(req, res) => {   
    res.json(req.session)
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
