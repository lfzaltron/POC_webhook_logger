const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Array to store received requests
const receivedRequests = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive webhook calls from SendGrid
app.post("/webhook", (req, res) => {
  const { body } = req;

  // Store the received request in memory
  receivedRequests.push(body);

  res.sendStatus(200); // Respond with 200 OK to acknowledge receipt
});

// Endpoint to display all received requests
app.get("/requests", (req, res) => {
  res.json(receivedRequests);
});

// Endpoint to display clear all received requests
app.get("/clear", (req, res) => {
  receivedRequests.splice(0, receivedRequests.length);
  res.sendStatus(200);
});

// Endpoint to display all received requests
app.get("/", (req, res) => {
  res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
