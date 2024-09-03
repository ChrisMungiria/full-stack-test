const express = require("express");

require("dotenv").config();
const dotenv = require("dotenv");

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`);
});
