import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import salesRoutes from "./routes/salesRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "TruEstate Retail Sales Management API" });
});

app.use("/api/sales", salesRoutes);

const startServer = async () => {
  try {
    await connectDB(); // connect to MongoDB first

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
