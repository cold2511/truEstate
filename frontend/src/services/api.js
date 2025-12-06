import axios from "axios";

const api = axios.create({
  baseURL: "https://truestate-3jvo.onrender.com/api"

});

export const fetchSales = async (params) => {
  const response = await api.get("/sales", { params });
  return response.data;
};
