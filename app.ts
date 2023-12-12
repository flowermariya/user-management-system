const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
