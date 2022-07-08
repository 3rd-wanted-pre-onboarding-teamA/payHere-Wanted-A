const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const index = require("./server/routes/index");

class App {
  constructor() {
    this.app = express();
    this.setViewEngine();
    this.setMiddleWare();
    this.setStatic();
    this.getRouting();
    this.errorHandler();
  }

  setMiddleWare() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(logger("dev"));
    this.app.use(cors());
  }

  setViewEngine() {
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "views"));
  }
  
  setStatic() {
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  getRouting() {
    this.app.use("/", index);
  }

  errorHandler() {
    this.app.use((req, res, _) => {
      res.status(400).render("error.ejs", { status: 404, message: "잘못된 접근입니다." });
    });

    this.app.use((req, res, _) => {
      res.status(500).render("error.ejs", { status: 500, message: "서버에러입니다." });
    });
  }
}

module.exports = new App().app;
