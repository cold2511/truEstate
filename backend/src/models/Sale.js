import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  transactionId: String,

  customerId: String,
  customerName: String,
  phoneNumber: String,
  gender: String,
  age: Number,
  customerRegion: String,
  customerType: String,

  productId: String,
  productName: String,
  brand: String,
  productCategory: String,
  tags: [String],

  quantity: Number,
  pricePerUnit: Number,
  discountPercentage: Number,
  totalAmount: Number,
  finalAmount: Number,

  date: String, // keep as string (YYYY-MM-DD) – fine for range filter
  paymentMethod: String,
  orderStatus: String,
  deliveryType: String,

  storeId: String,
  storeLocation: String,
  salespersonId: String,
  employeeName: String
});

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;
