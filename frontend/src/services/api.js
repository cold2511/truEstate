import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const fetchSales = async (params) => {
  const response = await api.get("/sales", { params });
  return response.data;
};
