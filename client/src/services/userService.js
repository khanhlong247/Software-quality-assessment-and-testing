import axios from "./axiosInstance";

const API_URL = "http://localhost:8080/users";

export const getAllUsers = () => axios.get(API_URL);
export const createUser = (data) => axios.post(API_URL, data);
export const updateUser = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
export const getInformation = (id) => axios.get(`${API_URL}/${id}/me`);
export const changePassword = (data) =>
  axios.post(`${API_URL}/${id}change-password`, data);
