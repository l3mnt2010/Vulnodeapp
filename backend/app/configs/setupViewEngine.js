const express = require("express");
const setUp = (app) => {
  app.set("view engine", "ejs");
};

module.exports = setUp;
