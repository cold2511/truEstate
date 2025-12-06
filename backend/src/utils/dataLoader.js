// import fs from "fs";
// import path from "path";
// import { parse } from "csv-parse/sync";

// let cachedData = null;

// export const getSalesData = () => {
//   if (cachedData) return cachedData;

//   const __dirname = path.resolve();
//   const filePath = path.join(__dirname, "backend", "data", "sales.csv");

//   const fileContent = fs.readFileSync(filePath, "utf-8");
//   const records = parse(fileContent, {
//     columns: true,
//     skip_empty_lines: true
//   });

//   // Normalize keys – adjust mappings if column names differ in your CSV
//   cachedData = records.map((row) => ({
//     customerId: row["Customer ID"],
//     customerName: row["Customer Name"],
//     phoneNumber: row["Phone Number"],
//     gender: row["Gender"],
//     age: row["Age"] ? Number(row["Age"]) : null,
//     customerRegion: row["Customer Region"],
//     customerType: row["Customer Type"],

//     productId: row["Product ID"],
//     productName: row["Product Name"],
//     brand: row["Brand"],
//     productCategory: row["Product Category"],
//     tags: row["Tags"] ? row["Tags"].split(",").map((t) => t.trim()) : [],

//     quantity: row["Quantity"] ? Number(row["Quantity"]) : 0,
//     pricePerUnit: row["Price per Unit"] ? Number(row["Price per Unit"]) : 0,
//     discountPercentage: row["Discount Percentage"]
//       ? Number(row["Discount Percentage"])
//       : 0,
//     totalAmount: row["Total Amount"] ? Number(row["Total Amount"]) : 0,
//     finalAmount: row["Final Amount"] ? Number(row["Final Amount"]) : 0,

//     date: row["Date"], // assume format YYYY-MM-DD or similar
//     paymentMethod: row["Payment Method"],
//     orderStatus: row["Order Status"],
//     deliveryType: row["Delivery Type"],
//     storeId: row["Store ID"],
//     storeLocation: row["Store Location"],
//     salespersonId: row["Salesperson ID"],
//     employeeName: row["Employee Name"]
//   }));
//   console.log("Loaded records from CSV:", cachedData.length);


//   return cachedData;
// };



//................................................................
// import fs from "fs";
// import path from "path";
// import { parse } from "csv-parse/sync";

// let cachedData = null;

// export const getSalesData = () => {
//   if (cachedData) return cachedData;

//   const __dirname = path.resolve();
//   const filePath = path.join(__dirname, "data", "sales.csv");

//   console.log("Reading CSV from:", filePath);

//   const fileContent = fs.readFileSync(filePath, "utf-8");
//   const records = parse(fileContent, {
//     columns: true,
//     skip_empty_lines: true
//   });

//   cachedData = records.map((row) => ({
//     customerId: row["Customer ID"],
//     customerName: row["Customer Name"],
//     phoneNumber: row["Phone Number"],
//     gender: row["Gender"],
//     age: row["Age"] ? Number(row["Age"]) : null,
//     customerRegion: row["Customer Region"],
//     customerType: row["Customer Type"],

//     productId: row["Product ID"],
//     productName: row["Product Name"],
//     brand: row["Brand"],
//     productCategory: row["Product Category"],
//     tags: row["Tags"] ? row["Tags"].split(",").map((t) => t.trim()) : [],

//     quantity: row["Quantity"] ? Number(row["Quantity"]) : 0,
//     pricePerUnit: row["Price per Unit"] ? Number(row["Price per Unit"]) : 0,
//     discountPercentage: row["Discount Percentage"]
//       ? Number(row["Discount Percentage"])
//       : 0,
//     totalAmount: row["Total Amount"] ? Number(row["Total Amount"]) : 0,
//     finalAmount: row["Final Amount"] ? Number(row["Final Amount"]) : 0,

//     date: row["Date"],
//     paymentMethod: row["Payment Method"],
//     orderStatus: row["Order Status"],
//     deliveryType: row["Delivery Type"],
//     storeId: row["Store ID"],
//     storeLocation: row["Store Location"],
//     salespersonId: row["Salesperson ID"],
//     employeeName: row["Employee Name"]
//   }));

//   console.log("Loaded records from CSV:", cachedData.length);

//   return cachedData;
// };
///......................................................


import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

let cachedData = null;

export const getSalesData = () => {
  if (cachedData) return cachedData;

  const __dirname = path.resolve();
  const filePath = path.join(__dirname, "data", "sales.csv");

  console.log("Reading CSV from:", filePath);

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  // Map CSV columns → normalized keys for app
  cachedData = records.map((row) => ({
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
    tags: row["Tags"] ? row["Tags"].split(",").map((t) => t.trim()) : [],

    quantity: row["Quantity"] ? Number(row["Quantity"]) : 0,
    pricePerUnit: row["Price per Unit"] ? Number(row["Price per Unit"]) : 0,
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

  console.log("Loaded records from CSV:", cachedData.length);

  return cachedData;
};
