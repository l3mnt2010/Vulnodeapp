const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const authenticateUser = require("./authorRoute");
const jwt = require("jsonwebtoken");
const authRouter = (app, mongo, secret_Key) => {
  route.get("/register", (req, res, next) => {
    return res.render("register");
  });
  route.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
    try {
      let conn = await mongo.connect();
      console.log("kết nối database register thành công");
      let db = conn.db("authentication");
      let collection = db.collection("accounts");
      const existingUser = await collection.findOne({ username: username });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      // Tạo salt ngẫu nhiên
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = { username: username, password: hashedPassword };
      console.log("đến dòng 25");
      await collection.insertOne(newUser);
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await mongo.close();
    }
  });
  route.get("/login", (req, res, next) => {
    return res.render("login", { message: "" });
  });
  route.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    try {
      let conn = await mongo.connect();
      console.log("kết nối database login thành công");
      let db = conn.db("authentication");
      let collection = db.collection("accounts");
      const user = await collection.findOne({ username });
      if (!user) {
        console.log("User not found");
        return res.status(401).json({ message: "User not found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log("Invalid password");
        return res.status(401).json({ message: "Invalid password" });
      }
      const object = { username: user.username };
      const token = jwt.sign(object, secret_Key, {
        expiresIn: "1h",
      });
      // Lưu token vào cookie
      res.cookie("token", token, { httpOnly: false, secure: false });

      return res.render("login", {
        message:
          "Login successful your flag is L3MKM4{l0g_in_succ3ss_fu11_w3llcom3_to_my_labs}",
      });
    } catch (error) {
    } finally {
      mongo.close();
    }
  });
  return app.use("/", route);
};

module.exports = authRouter;
