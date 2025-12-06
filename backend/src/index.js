import express from "express";
import cors from "cors";
import salesRoutes from "./routes/salesRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "TruEstate Retail Sales Management API" });
});

app.use("/api/sales", salesRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
