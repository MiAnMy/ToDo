import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/todos";

const axiosPatch = (id, obj) => {
  return axios.patch(`${url}/${id}`, obj);
};

const axiosDelete = (id) => {
  return axios.delete(`${url}/${id}`);
};

const axiosPost = () => {
  return axios.post(url);
};

const axiosGet = () => {
  return axios.get(`${url}?userId=1`);
};

export { axiosPatch, axiosDelete, axiosPost, axiosGet };
