function generateUniqueTrackingId() {
  // Trong thực tế, bạn nên tạo TrackingId một cách an toàn và đảm bảo tính duy nhất
  return Math.random().toString(36).substr(2, 9);
}
// req.cookies.trackingId || generateUniqueTrackingId()
const authorTrackingId = (req, res, next) => {
  const trackingId = "adafedawdfaadad";

  res.cookie("trackingId", trackingId, { maxAge: 900000, httpOnly: true });

  // Gán TrackingId vào request để sử dụng trong các route khác
  req.trackingId = trackingId;
  next();
};

module.exports = authorTrackingId;
