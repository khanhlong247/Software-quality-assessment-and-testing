import axios from "./axiosInstance";

const API_URL = "http://localhost:8080/semesters";

export const getAllSemesters = () => axios.get(API_URL);
export const createSemester = (data) => axios.post(API_URL, data);
export const updateSemester = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteSemester = (id) => axios.delete(`${API_URL}/${id}`);