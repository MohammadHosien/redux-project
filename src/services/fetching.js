import axios from "axios";

const POSTURL = "http://localhost:9000/posts";
const FAVURL = "http://localhost:9000/fav";



export const getContact = () => {
  return axios.get(POSTURL);
};
export const postContact = (post) => {
  return axios.post(POSTURL, post);
};

export const deletePost = (id) => {
  return axios.delete(`http://localhost:9000/posts/${id}`);
};

export const EditPost = (id, post) => {
  return axios.put(`http://localhost:9000/posts/${id}`, post);
};

export const getfavPost = () => {
  return axios.get(FAVURL);
};

export const postFav = (post) => {
  return axios.post(FAVURL, post);
};

export const deletefav = (id) => {
  return axios.delete(FAVURL + `/${id}`);
};

export const postUser = (post) => {
  return axios.post("http://localhost:9000/users", post);
};

export const getUser = () => {
  return axios.get("http://localhost:9000/users");
};
