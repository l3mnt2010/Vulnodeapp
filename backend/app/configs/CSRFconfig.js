const csrf = require("csurf");
// Sử dụng csurf middleware để tạo và kiểm tra mã CSRF token
const csrfProtection = csrf({ cookie: true });

module.exports = csrfProtection;
