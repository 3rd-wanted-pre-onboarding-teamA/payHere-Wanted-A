const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const index = require("./server/routes/index");
const error = require("./server/db/error");
const cookieParser = require("cookie-parser");

class App {
  /** 
   * 기능: 서버 실행
   * 작성자: 허정연
   */
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
    this.app.use(cookieParser());
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
      res.status(400).render("error.ejs", error.NOT_FOUND );
    });

    this.app.use((req, res, _) => {
      res.status(500).render("error.ejs", error.INTERNAL_SERVER_ERROR);
    });
  }
}

module.exports = new App().app;