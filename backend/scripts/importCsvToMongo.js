import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../src/config/db.js";
import Sale from "../src/models/Sale.js";

dotenv.config();

const run = async () => {
  try {
    await connectDB();

    const filePath = path.join(process.cwd(), "data", "sales.csv");
    console.log("Reading CSV from:", filePath);

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });

    const docs = records.map((row) => ({
      transactionId: row["Transaction ID"],

      customerId: row["Customer ID"],
      customerName: row["Customer Name"],
      phoneNumber: row["Phone Number"],
      gender: row["Gender"],
      age: row["Age"] ? Number(row["Age"]) : null,
      customerRegion: row["Customer Region"],
      customerType: row["Customer Type"],

      productId: row["Product ID"],
      productName: row["Product Name"],
      brand: row["Brand"],
      productCategory: row["Product Category"],
      tags: row["Tags"]
        ? row["Tags"].split(",").map((t) => t.trim())
        : [],

      quantity: row["Quantity"] ? Number(row["Quantity"]) : 0,
      pricePerUnit: row["Price per Unit"]
        ? Number(row["Price per Unit"])
        : 0,
      discountPercentage: row["Discount Percentage"]
        ? Number(row["Discount Percentage"])
        : 0,
      totalAmount: row["Total Amount"] ? Number(row["Total Amount"]) : 0,
      finalAmount: row["Final Amount"] ? Number(row["Final Amount"]) : 0,

      date: row["Date"],
      paymentMethod: row["Payment Method"],
      orderStatus: row["Order Status"],
      deliveryType: row["Delivery Type"],
      storeId: row["Store ID"],
      storeLocation: row["Store Location"],
      salespersonId: row["Salesperson ID"],
      employeeName: row["Employee Name"]
    }));

    console.log("Deleting existing sales…");
    await Sale.deleteMany({});

    console.log("Inserting docs:", docs.length);
    await Sale.insertMany(docs);

    console.log("Import complete.");
  } catch (err) {
    console.error("Import error:", err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

run();
