const express = require("express"); //tạo server
const app = express();
const mongoose = require("mongoose"); //kết nối và tương tác với mongodb
const dotenv = require("dotenv"); //để gọi các biến trong file .env
dotenv.config();
const cors = require("cors");
const api = require("./routes/api");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//BE server hasn't accept json type yet. Use express.json() to handle this problem
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "johm",
    resave: false, //đặt lại session cookie sau mỗi request.
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_LOCAL,
      ttl: 14 * 24 * 60 * 60, //default time to live is 14 days. Don't use ttl while setting autoRemove: interval
      // autoRemove: "native", //native mode is default, other modes: interval, disabled
      //   autoRemoveInterval: 10, //10 minutes
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 14 * 24 * 60 * 60, //60p * 60g * 24ms
    },
  })
);

//public images folder
app.use("/images", express.static(path.join(__dirname, "/images")));

//use mongoose to connect mongodb
//this function below is a promiss
mongoose
  .connect(process.env.MONGO_LOCAL)
  .then(() => {
    console.log("DBConnection successfull!!!");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const config = { storage: storage };
const upload = multer(config);

api.initApiRoutes(app, upload);

//create BE server
const PORT = process.env.PORT || 5000; //khi up lên host
app.listen(PORT, () => {
  console.log(`backend server is running on port ${PORT} !`);
});
