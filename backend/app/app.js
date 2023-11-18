const express = require("express");
const changePasswordRoute = require("./routes/changePasswordRoute");
const dotenv = require("dotenv");
const limiter = require("./middlewares/deniedRequest");
const authRouteMySQL = require("./routes/authRouteMySQl");
const setUp = require("./configs/setupViewEngine");
const cors = require("cors");
const authenticateUser = require("./routes/authorRoute");
const bodyParser = require("body-parser");
const path = require("path");
const Account = require("./models/models/account");
const sequelize = require("./configs/connect");

const app = express();
const authRouter = require("./routes/authRoute");
const mongodb = require("mongodb");
const cookieParser = require("cookie-parser");
const mysql = require("mysql2");
dotenv.config();
//

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api-v1-nestjs",
});
//
const mongoClient = mongodb.MongoClient;
const url = process.env.URL;
const secret_Key = process.env.secret_Key;
const mongo = new mongoClient(url);
let conn;

const port = process.env.PORT;

app.use(cors());
// app.use(limiter);
app.use(cookieParser());
app.set("views", path.join(__dirname, "view"));
setUp(app);
// Sử dụng express.urlencoded() để xử lý dữ liệu URL-encoded
app.use(express.urlencoded({ extended: false }));

// Sử dụng express.json() để xử lý dữ liệu JSON
app.use(express.json());

authRouter(app, mongo, secret_Key);
changePasswordRoute(app, mongo, secret_Key);
authRouteMySQL(app, connection);

// app.get("/", (req, res) => {
//   res.render("webSocket");
// });
app.addH;
app.get("/", (req, res) => {
  const body = req.body.message;
  const user = { name: "lam", age: 18 };
  res.status(200).json(body);
});
app.get("/about", (req, res) => {
  const userMessage = req.query.message || "Hello, World!";
  res.render("index", { message: userMessage });
});
app.get("/comment", authenticateUser, async (req, res) => {
  try {
    conn = await mongo.connect();
    console.log("kết nối thành công");
    let db = conn.db("authentication");
    let collection = db.collection("comments");
    const username = { content: "<script>alert(456)</script>" };
    let results = await collection.findOne(username);
    console.log(results.content);

    // collection.find({}).toArray((err, posts) => {
    //   if (err) {
    //     console.error("Error fetching posts from MongoDB:", err);
    //     return res.status(304).json("not FOUND");
    //   }

    res.render("comment", { comment: results.content });
    mongo.close();
  } catch (e) {
    console.log(e);
  }
});
app.post("/comment", async (req, res) => {
  try {
    conn = await mongo.connect();
    console.log("kết nối thành công");
    // let db = conn.db("sample_analytics");
    // let collection = db.collection("accounts");
    // const id = { account_id: 299072 };
    // let results = await collection.findOne(id);
    // console.log(results);
    let db = conn.db("authentication");
    let collection = db.collection("comments");
    const userMessage = req.body.content;
    const userName = req.body.user;
    var body_comment = { content: userMessage, user: userName };
    await collection.insertOne(body_comment, (err, result) => {
      if (err) {
        console.log("thêm mới thất bại");
        throw err;
      }
      console.log("thêm mới comment thành công");
    });
    await collection.find({}).toArray((err, posts) => {
      if (err) {
        console.error("Error fetching posts from MongoDB:", err);
        return res.status(500).send("Internal Server Error");
      }

      return res.render("comment", { comment: posts });
    });
  } catch (e) {
    return res.json("xảy ra lỗi");
  } finally {
    mongo.close();
  }
});
app.use(express.static("public"));
app.get("/changepassword", (req, res) => {
  res.render("changepassword");
});

sequelize.sync().then(() => {
  Account.findOne({
    where: { username: "admin" }, // Replace with your specific condition
  })
    .then((post) => {
      if (post) {
        console.log(
          "Found post:====================================>",
          post.toJSON()
        );
      } else {
        console.log("Post not found.");
      }
    })
    .catch((error) => {
      console.error(
        "Error finding post:===================================>",
        error
      );
    });
});

app.get("/dombasedXSS", (req, res) => {
  res.render("dombasedXSS");
});

app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
