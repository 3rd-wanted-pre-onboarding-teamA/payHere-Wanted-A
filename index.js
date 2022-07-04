const express = require("express");
const cors = require("cors");
const path = require("path");
const index = require("./server/routes/index");

const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", index);

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
