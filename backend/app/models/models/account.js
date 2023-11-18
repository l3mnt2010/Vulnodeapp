const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("../../configs/connect");

const Account = sequelize.define("meomeo", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permission: {
    default: "user",
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
sequelize.sync();
module.exports = Account;
