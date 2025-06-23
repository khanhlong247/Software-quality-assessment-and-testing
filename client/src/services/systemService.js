import axios from "./axiosInstance";

export const updateStatsMoney = (money) => {
  return axios.post("http://localhost:8080/stats/update", {
    money: Number(money),
  });
};
