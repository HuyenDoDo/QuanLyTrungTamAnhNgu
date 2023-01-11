import axios from "../axios";

const uploadFile = async (data) => {
  return await axios.post("/upload", data);
};

export default uploadFile;
