require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Request Header Parser Microservice" });
});

// API endpoint: /api/whoami
app.get("/api/whoami", (req, res) => {
  const ipaddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const language = req.headers["accept-language"];
  const software = req.headers["user-agent"];

  res.json({
    ipaddress,
    language,
    software
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
