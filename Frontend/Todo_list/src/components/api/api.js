import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1000/api",
});

export default api;


