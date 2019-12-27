// dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// scraping tools
const cheerio = require("cheerio");
const axios = require("axios");

// require all models
const db = require("./models");

const PORT = process.env.PORT || 3000;

// initialize express
const app = express();

app.use(logger("dev"));
// parse req.body as JSON
app.use(express.urlencoded({exteded: true}));
app.use(express.json());
// set public as static
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nyt_scraper";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreatedIndex", true)