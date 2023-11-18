const express = require("express");
const route = express.Router();

const authRouter = (app, db) => {
  route.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
  });

  return app.use("/auth", route);
};
