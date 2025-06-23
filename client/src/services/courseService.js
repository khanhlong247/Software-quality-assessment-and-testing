import axios from "./axiosInstance";

const API_URL = "http://localhost:8080/courses";

export const getAllCourses = () => axios.get(API_URL);
export const getCourse = (id) => axios.get(`${API_URL}/${id}`);
export const createCourse = (data) => axios.post(API_URL, data);
export const updateCourse = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCourse = (id) => axios.delete(`${API_URL}/${id}`);
