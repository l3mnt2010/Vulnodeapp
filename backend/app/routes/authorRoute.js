const jwt = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
  const token = req.cookies.tokenMysql;

  if (!token) {
    return res.status(401).json({ message: "Missing authorization token" });
  }

  jwt.verify(token, process.env.secret_Key, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid token" });
    }
    // Lưu thông tin người dùng đã xác thực trong biến request để sử dụng ở các middleware hoặc route khác
    req.user = decoded;
    next();
  });
};

module.exports = authenticateUser;
