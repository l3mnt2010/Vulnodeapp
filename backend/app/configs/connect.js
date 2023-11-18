const Sequelize = require("sequelize");
const sequelize = new Sequelize("api-v1-nestjs", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
sequelize.sync();
module.exports = sequelize;

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("postgres", "postgres", "89618937Lam#1", {
//   host: "localhost",
//   dialect: "postgres",
//   port: 5432,
// });
// const connect = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//     sequelize
//       .query("SELECT * FROM posts", { type: sequelize.QueryTypes.SELECT })
//       .then((results) => {
//         console.log("Query results:", results);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };
// connect();

// module.exports = sequelize;
// Account.create({
//   username: "new_user",
//   password: "new_is_this",
// })
//   .then((newUser) => {
//     console.log("Dữ liệu đã được thêm thành công:", newUser.toJSON());
//   })
//   .catch((error) => {
//     console.error("Lỗi khi thêm dữ liệu:", error);
//   });

// sequelize
//     .query("SELECT * FROM accounts", { type: sequelize.QueryTypes.SELECT })
//     .then((results) => {
//       console.log("Query results:", results);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
