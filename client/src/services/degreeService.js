import axios from './axiosInstance';

const API_URL = "http://localhost:8080/degrees";

export const getAllDegrees = () => axios.get(API_URL);
export const getDegreeById = (id) => axios.get(`${API_URL}/${id}`);
export const createDegree = (data) => axios.post(API_URL, data);
export const updateDegree = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteDegree = (id) => axios.delete(`${API_URL}/${id}`);
