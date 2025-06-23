import axios from "./axiosInstance";

const API_URL = "http://localhost:8080/teachers";

export const getAllTeachers = () => axios.get(API_URL);
export const createTeacher = (data) => axios.post(API_URL, data);
export const updateTeacher = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteTeacher = (id) => axios.delete(`${API_URL}/${id}`);

