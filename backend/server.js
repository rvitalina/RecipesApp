const express = require("express");
const app = express();
require("dotenv").config();
const pool = require("./db");
const cors = require("cors");
const router = require("./routes/recipe")

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static("./public/images/"));

app.use("/", require("./routes/user"))
app.use("/recipe", require("./routes/recipe"));

app.listen(PORT, (err) => {
  console.log(`App is listening on port ${PORT}`);
});

