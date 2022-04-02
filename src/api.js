import axios from 'axios';
const baseUrl = '/api/';
const errorCb = console.error;
const successCb = console.log;
const index = (
  method = 'get',
  url = '',
  data = null,
  success = successCb,
  failure = errorCb
) => {
  return axios
    .request({
      method,
      url: baseUrl + url,
      data,
    })
    .then((res) => {
      success(res.data);
    })
    .catch(failure);
};
export default index;
