import axios from "./axiosInstance";

const BASE_URL = "http://localhost:8080/class-sections";

export const getAllClassSections = () => axios.get(BASE_URL);
export const createClassSections = (data) => axios.post(`${BASE_URL}/multi-create`, data);
export const updateClassSection = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteClassSection = (id) => axios.delete(`${BASE_URL}/${id}`);
