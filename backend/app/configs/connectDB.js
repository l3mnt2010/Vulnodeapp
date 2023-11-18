const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const url =
  "mongodb+srv://ll3mkm4:89618937@cluster0.bns1tot.mongodb.net/?retryWrites=true&w=majority";

const mongo = new mongoClient(url);
let conn;
const connects = async () => {
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
    var obj = { content: "<script>alert(123)</script>", user: "admin" };
    collection.insertOne(obj, (err, result) => {
      if (err) {
        console.log("thêm mới thất bại");
        throw err;
      }
      console.log("thêm mới thành công");
    });
    const username = { content: "<script>alert(123)</script>" };
    let results = await collection.findOne(username);
    console.log(results);
  } catch (e) {
    console.error(e);
  }
};

connects();
