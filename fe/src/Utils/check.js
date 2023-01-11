import validator from "validator";

export const checkEmptyInput = (obj) => {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (!obj[key] && obj[key] !== 0) {
        return key;
      }
    }
  }
  return;
};

export const checkName = (name) => {
  return validator.isAlpha(name, "vi-VN", { ignore: " " });
};

export const checkEmail = (email) => {
  return validator.isEmail(email);
};

export const checkNumeric = (number) => {
  return validator.isNumeric(number, { no_symbols: false });
};
