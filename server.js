const path = require('path')
require("dotenv").config();
const express = require("express");
const mongoose= require("mongoose");

const app = express();
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017";;
const PORT = process.env.PORT || 3001;

app.use(express.json());
// Host
app.use(express.static(path.join(__dirname, 'frontend/dist')))

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/private"));

// Redirect all other routes to frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/dist/index.html"));
});

// Connect to MongoDB and start the server
mongoose.connect(DB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`MongoDB Connection Established\nServer up and running on PORT:${PORT}`)
  })
}).catch((error) => {
  console.log(error);
})
