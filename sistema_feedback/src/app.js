const express = require("express");
const app = express();

require("./config/database");

const feedbackRoutes = require("./routes/feedbackRoutes");

app.use(express.json());
app.use("/feedbacks", feedbackRoutes);

module.exports = app;