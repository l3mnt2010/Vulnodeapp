const express = require("express");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api-v1-nestjs",
});

const connectMySQL = async () => {
  const username = "lamdeptrai";
  const password = "testUser123";
  const querys =
    'SELECT * FROM accounts WHERE username = "' +
    username +
    '" AND password = "' +
    password +
    '"';
  console.log(querys);
  const query = "SELECT * FROM accounts WHERE username = ? AND password = ?";
  connection.query(querys, [username, password], (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(result);
  });
};

connectMySQL();
