import moment from "moment";
moment().format();

export const convertDate = (date) => {
  const res = moment(date).format("DD-MM-YYYY");
  return res;
};

export const convertMonetaryUnit = (money) => {
  let str = money + "";
  if (str.length > 3) {
    let arr = [];
    let count = 0;
    for (let i = str.length - 1; i >= 0; i--) {
      if (count === 3) {
        arr.push(".");
        count = 0;
      }
      arr.push(str[i]);
      count++;
    }
    return arr.reverse().join("");
  }
  return str;
};

export const convertStatusCode = (code) => {
  let res = "";
  switch (code) {
    case 0:
      res = "Đang đóng";
      break;
    case 1:
      res = "Đang mở";
      break;
    case 2:
      res = "Đã đóng";
      break;
    default:
      break;
  }
  return res;
};

export const switchKeytoWords = (key) => {
  let res = "";
  switch (key) {
    case "hoTenLot":
      res = "họ";
      break;
    case "ten":
      res = "tên";
      break;
    case "email":
      res = "email";
      break;
    case "sdt":
      res = "số điện thoại";
      break;
    case "password":
      res = "mật khẩu";
      break;
    case "diaChi":
      res = "địa chỉ";
      break;
    default:
      break;
  }
  return res;
};
