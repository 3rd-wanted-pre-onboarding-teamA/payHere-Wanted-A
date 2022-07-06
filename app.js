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

  // TODO: 에러 핸들링, 공통 에러 화면 필요
  // errorHandler() { 
  //   this.app.use((req, res, _) => {
  //     res.status(404).render("404.ejs");
  //   });

  //   this.app.use((err, req, res, _) => {
  //     res.status(500).render("500.ejs");
  //   });
  // }
}

module.exports = new App().app;
