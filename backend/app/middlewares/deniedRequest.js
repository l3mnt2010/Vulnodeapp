const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();

// Tạo một bộ hạn chế tốc độ cho địa chỉ IP cụ thể
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 phút
  max: 10, // số lượng yêu cầu tối đa trong khoảng thời gian trên
  message: "Quá nhiều yêu cầu từ địa chỉ IP của bạn, vui lòng thử lại sau.",
});

module.exports = limiter;

// const express = require('express');
// const app = express();

// const requestLimit = 100; // Số yêu cầu tối đa cho mỗi client
// const timeWindow = 60 * 1000; // 1 phút

// const requestCount = new Map();

// app.use((req, res, next) => {
//   const clientIP = req.ip;

//   if (!requestCount.has(clientIP)) {
//     requestCount.set(clientIP, 1);
//   } else {
//     requestCount.set(clientIP, requestCount.get(clientIP) + 1);
//   }

//   setTimeout(() => {
//     requestCount.delete(clientIP);
//   }, timeWindow);

//   if (requestCount.get(clientIP) > requestLimit) {
//     return res.status(429).json({ error: 'Quá nhiều yêu cầu, hãy thử lại sau.' });
//   }

//   next();
// });

// // Xử lý các yêu cầu khác ở đây

// app.listen(3000, () => {
//   console.log('Server đang chạy trên cổng 3000');
// });
