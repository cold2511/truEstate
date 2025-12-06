import { getSalesData } from "../utils/dataLoader.js";
import { applyQuery } from "../utils/filters.js";

export const fetchSales = (query) => {
  const data = getSalesData();
  return applyQuery(data, query);
};
