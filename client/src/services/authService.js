import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const login = (email, password) =>
  axios.post(`${API_URL}/login`, { email, password });
