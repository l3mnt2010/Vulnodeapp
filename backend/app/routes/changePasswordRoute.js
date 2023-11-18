const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const route = express.Router();

const changePasswordRoute = (app, mongo, secret_Key) => {
  route.get("/change-password", async (req, res, next) => {
    const token = req.cookies.token;
    const new_password = req.body.new_password;
    if (token && new_password) {
      try {
        const decodedToken = jwt.verify(token, secret_Key);
        const username = decodedToken.username;
        console.log(`Username: ${username}`);
        if (username) {
          let conn = await mongo.connect();
          let db = conn.db("authentication");
          let collection = db.collection("accounts");
          console.log("kết nối database change_password thành công");
          const user = await collection.findOne(username);
          if (!user) {
            return res.json("Không thể thay đổi mật khẩu");
          }
          const passwordMatch = await bcrypt.compare(
            new_password,
            user.password
          );
          if (passwordMatch) {
            res.json("mật khẩu mới giống mật khẩu cũ");
          }
          return res.json("đổi mật khẩu thành công");
        }
      } catch (e) {
        console.log(e);
        return res.json("Lỗi sever");
      } finally {
        mongo.close();
      }
    }
  });
  app.use("/", route);
};

module.exports = changePasswordRoute;
