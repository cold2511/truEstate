import express from "express";
import { handleGetSales } from "../controllers/salesController.js";


const router = express.Router();


router.get("/", handleGetSales);


export default router;

