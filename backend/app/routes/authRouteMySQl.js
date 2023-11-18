const express = require("express");
const route = express.Router();
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const multer = require("multer");
const bcrypt = require("bcrypt");
const path = require("path");
const authenticateUser = require("./authorRoute");
const authorTrackingId = require("./authorTrackingId");
const jwt = require("jsonwebtoken");

const authRouteMySQL = (app, connection) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../app/upload"));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });
  route.get("/shop", authorTrackingId, async (req, res, next) => {
    const name = req.query.item || 1;
    const query = `SELECT link,name FROM items WHERE name = ${name}`;
    console.log("=====================>", query);
    connection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log(result);
      return res.render("showcategories", { category: result });
    });
  });
  route.get("/menu", authorTrackingId, async (req, res, next) => {
    const trackingId = req.cookies.trackingId || "hehe không biết đâu";
    const queryTrackingId = `SELECT * FROM users WHERE trackingId = '${trackingId}'`;
    console.log(queryTrackingId, "===================> dòng 24");
    connection.query(queryTrackingId, (err, results) => {
      if (err) {
        return res.status(301).json(err);
      }
      console.log(results);
      if (results.length > 0) {
        const name = req.query.menu;
        const query = `SELECT link,name FROM items WHERE name = ${name}`;
        console.log(query, "=================> dòng 32");
        connection.query(query, (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
          console.log(result);
          return res.render("menu", {
            menu: result,
            text: "Old user !! Wellcome back",
          });
        });
      } else {
        return res.status(200).json(results);
      }
    });
  });
  route.get("/shop", authorTrackingId, async (req, res, next) => {
    const name = req.query.item || 1;
    const query = `SELECT link,name FROM items WHERE name = ${name}`;
    console.log("=====================>", query);
    connection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log(result);
      return res.render("showcategories", { category: result });
    });
  });
  route.get("/find", authorTrackingId, async (req, res, next) => {
    const trackingId = req.cookies.trackingId || "hehe không biết đâu";
    const queryTrackingId = `SELECT * FROM users WHERE trackingId = '${trackingId}'`;
    console.log(queryTrackingId, "===================> dòng 24");
    connection.query(queryTrackingId, (err, results) => {
      if (err) {
        return res.status(301).json(err);
      }
      console.log(results);
      if (results.length > 0) {
        const name = req.query.menu;
        const query = `SELECT link,name FROM items WHERE name = ${name}`;
        console.log(query, "=================> dòng 32");
        connection.query(query, (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
          console.log(result);
          return res.render("find", {
            menu: result,
          });
        });
      } else {
        return res.status(200).json(results);
      }
    });
  });

  // commandInjection
  route.get("/commandInjection", async (req, res, next) => {
    return res.render("commandinjection", { any: "" });
  });
  route.post("/commandInjection", async (req, res, next) => {
    // US.txt" & type "app\\files\\flag.
    //type "app\\countries\\US.txt" & type "app\\files\\flag.txt"
    const reqBody = req.body.countries;
    const command = `type "app\\countries\\${reqBody}.txt"`;
    try {
      const { stdout, stderr } = await exec(command);
      console.log(stdout);
      // In ra đầu ra của lệnh `dir`
      return res.render("commandinjection", { any: stdout });
    } catch (error) {
      console.error("Error while processing request: " + error);
      return res.status(500).send("Internal Server Error");
    }
  });
  // commandInjection

  // uploadfile vul
  route.post("/upload", upload.single("files"), (req, res) => {
    if (!req.file) {
      return res.status(400).send("Không có tệp nào được tải lên.");
    }
    console.log(req.file);
    return res.render("test", { img: req.file });
  });

  // uploadfile vul

  // blind sql injection
  route.get("/shop", authorTrackingId, async (req, res, next) => {
    const trackingId = req.cookies.trackingId || "hehe không biết đâu";
    const queryTrackingId = `SELECT * FROM users WHERE trackingId = '${trackingId}'`;
    console.log(queryTrackingId, "===================> dòng 24");
    connection.query(queryTrackingId, (err, results) => {
      if (err) {
        return res.status(301).json(err);
      }
      console.log(results);
      if (results.length > 0) {
        const name = req.query.menu;
        const query = `SELECT link,name FROM items WHERE name = ${name}`;
        console.log(query, "=================> dòng 32");
        connection.query(query, (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
          console.log(result);
          return res.render("menu", {
            menu: result,
          });
        });
      } else {
        return res.status(200).json(results);
      }
    });
  });

  route.get("/gift", async (req, res, next) => {
    const name = req.query.gift || 1;
    const query = `SELECT * FROM gifts WHERE Gift = ?`;
    console.log("=====================>", query);
    connection.query(query, [name], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log(result);
      return res.render("gifts", { category: result });
    });
  });

  //test

  route.get("/login", async (req, res) => {
    return res.render("sqlinjectionLogin", { message: "chưa đăng nhập" });
  });
  route.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(password);
    const query = "SELECT * FROM accounts WHERE username = ? AND password =?";
    console.log(query);
    connection.query(query, [username, password], (err, result) => {
      if (err) {
        console.log(err);
        return res.render("sqlinjectionLogin", {
          message: "chưa đăng nhập xảy ra lỗi dòng 25",
        });
      }
      if (result.length > 0) {
        console.log(result);
        const payload = {
          id: result[0].id,
          username: result[0].username,
          permission: result[0].permission,
        };

        console.log(payload);
        const options = {
          expiresIn: "1d",
        };
        const token = jwt.sign(payload, process.env.secret_Key, options);
        res.cookie("tokenMysql", token, { httpOnly: true });
        res.cookie("username", payload.username, { httpOnly: true });
        return res.render("sqlinjectionLogin", {
          message: "đăng nhập thành công",
        });
      } else {
        console.log(result);
        return res.render("sqlinjectionLogin", {
          message: "lỗi xảy ra ở sever",
        });
      }

      // SELECT * FROM users WHERE username = 'admin' AND IF(1=1, SLEEP(5), 0)
    });
  });
  //tets

  // route.get("/login", async (req, res) => {
  //   return res.render("sqlinjectionLogin", { message: "chưa đăng nhập" });
  // });
  // route.post("/login", async (req, res) => {
  //   const username = req.body.username;
  //   const password = req.body.password;
  //   const query =
  //     'SELECT * FROM accounts WHERE username = "' +
  //     username +
  //     '" AND password = "' +
  //     password +
  //     '"';
  //   console.log(query);
  //   connection.query(query, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return res.render("sqlinjectionLogin", {
  //         message: "chưa đăng nhập xảy ra lỗi dòng 25",
  //       });
  //     }
  //     if (result.length > 0) {
  //       console.log(result);
  //       const payload = {
  //         id: result[0].id,
  //         username: result[0].username,
  //         permission: result[0].permission,
  //       };

  //       console.log(payload);
  //       const options = {
  //         expiresIn: "1d",
  //       };
  //       const token = jwt.sign(payload, process.env.secret_Key, options);
  //       res.cookie("tokenMysql", token, { httpOnly: true });
  //       res.cookie("username", payload.username, { httpOnly: true });
  //       return res.render("sqlinjectionLogin", {
  //         message: "đăng nhập thành công",
  //       });
  //     } else {
  //       console.log(result);
  //       return res.render("sqlinjectionLogin", {
  //         message: "lỗi xảy ra ở sever",
  //       });
  //     }

  //     // SELECT * FROM users WHERE username = 'admin' AND IF(1=1, SLEEP(5), 0)
  //   });
  // });

  // blind sql injection

  // SEVER SIDE TEMPLATE INJECTION
  route.get("/ssti", authenticateUser, async (req, res, next) => {
    return res.render("ssti", { user_name: "" });
  });
  route.post("/ssti", authenticateUser, async (req, res, next) => {
    const result = `Xin chào bạn ${req.body.user_name}`;
    console.log("=====================>", result);
    return res.render("ssti", { user_name: result });
  });
  // SEVER SIDE TEMPLATE INJECTION

  // CVE Mysql Bypass
  route.get("/meomeo", async (req, res) => {
    const username = "l3mkm4";
    const password = {
      password: true,
    };
    const query = "SELECT * FROM accounts WHERE username = ? AND password = ?";
    console.log(query);
    connection.query(query, [username, password], (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        console.log(result, "dòng 251");
      } else {
        console.log(result, "dòng 253");
      }

      // SELECT * FROM users WHERE username = 'admin' AND IF(1=1, SLEEP(5), 0)
    });
  });

  return app.use("/mysql", route);
};

module.exports = authRouteMySQL;
