function validateToken(bearerToken) {
  // Đây là một ví dụ đơn giản, bạn cần thay thế nó bằng cơ chế xác thực thực tế.

  // Kiểm tra xem mã thông báo có đúng định dạng Bearer không
  const tokenParts = bearerToken.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return false;
  }

  // Lấy phần mã thông báo từ chuỗi
  const token = tokenParts[1];

  // Đây là một ví dụ kiểm tra mã thông báo, bạn cần thay thế nó bằng cơ chế thực tế
  const validTokens = ["your_valid_token_1", "your_valid_token_2"];
  if (validTokens.includes(token)) {
    return true;
  }

  return false;
}
