import { getSales } from "../services/salesService.js";

export const handleGetSales = async (req, res) => {
  try {
    const result = await getSales(req.query);
    res.json(result);
  } catch (err) {
    console.error("Error in handleGetSales:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
