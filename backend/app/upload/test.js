const { exec } = require("child_process");
async function Connect() {
  exec(`start cmd`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Lỗi: ${error.message}`);
      module.exports = error;
      return;
    }
    if (stderr) {
      console.error(`Lỗi tiêu chuẩn: ${stderr}`);
      module.exports = stderr;
      return;
    }
    console.log(`Kết quả: ${stdout}`);
    module.exports = stdout;
  });
}
Connect();
