import axios from './axiosInstance';

const API_URL = 'http://localhost:8080/faculties';

export const getAllFaculties = () => axios.get(API_URL);
export const createFaculty = (data) => axios.post(API_URL, data);
export const updateFaculty = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteFaculty = (id) => axios.delete(`${API_URL}/${id}`);
