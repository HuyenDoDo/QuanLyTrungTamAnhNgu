module.exports = (req, res, next) => {
  if (req.session && req.session.hocVien) {
    next();
  } else {
    return res.status(200).json({
      EC: -1,
      MS: "Bạn chưa đăng nhập",
    });
  }
};
