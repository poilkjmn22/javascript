import axios from "axios";
const baseURL = "/api/";
const req = axios.create({
  baseURL,
});

req.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

req.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default req;
