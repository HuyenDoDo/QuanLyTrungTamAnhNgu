//hàm kiểm tra và lấy các input rỗng
const checkEmptyInput = (obj) => {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (!obj[key] && obj[key] !== 0) {
        return key;
      }
    }
  }
  return;
};

module.exports = { checkEmptyInput };
