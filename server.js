// dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");

// set up express
var app = express();
var PORT = process.env.PORT || 3000;

// handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


