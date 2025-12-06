import { fetchSales } from "../services/salesService.js";

export const getSales = (req, res) => {
  try {
    const {
      search,
      region,
      gender,
      ageMin,
      ageMax,
      category,
      tags,
      paymentMethod,
      startDate,
      endDate,
      sortBy,
      sortOrder,
      page = 1,
      limit = 10
    } = req.query;

    const query = {
      search: search || "",
      region,
      gender,
      ageMin: ageMin ? Number(ageMin) : null,
      ageMax: ageMax ? Number(ageMax) : null,
      category,
      tags: tags ? tags.split(",") : [],
      paymentMethod,
      startDate,
      endDate,
      sortBy,
      sortOrder: sortOrder || "desc",
      page: Number(page) || 1,
      limit: Number(limit) || 10
    };

    const result = fetchSales(query);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
