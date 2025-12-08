import Sale from "../models/Sale.js";

export const getSales = async (query) => {
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
    sortBy = "date",
    sortOrder = "desc",
    page = 1,
    limit = 10
  } = query;

  const filter = {};

  // Search on name or phone (case-insensitive)
  if (search) {
    const s = String(search).toLowerCase();
    filter.$or = [
      { customerName: { $regex: s, $options: "i" } },
      { phoneNumber: { $regex: s, $options: "i" } }
    ];
  }

  if (region) filter.customerRegion = region;
  if (gender) filter.gender = gender;

  if (ageMin || ageMax) {
    filter.age = {};
    if (ageMin) filter.age.$gte = Number(ageMin);
    if (ageMax) filter.age.$lte = Number(ageMax);
  }

  if (category) filter.productCategory = category;
  if (paymentMethod) filter.paymentMethod = paymentMethod;

  // Tags: require all provided tags
  if (tags) {
    const tagArray = Array.isArray(tags)
      ? tags
      : String(tags)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);

    if (tagArray.length > 0) {
      filter.tags = { $all: tagArray };
    }
  }

  // Date range (YYYY-MM-DD as strings)
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = startDate;
    if (endDate) filter.date.$lte = endDate;
  }

  // Sorting
  const sort = {};
  if (sortBy === "date") {
    sort.date = sortOrder === "asc" ? 1 : -1;
  } else if (sortBy === "quantity") {
    sort.quantity = sortOrder === "asc" ? 1 : -1;
  } else if (sortBy === "customerName") {
    sort.customerName = sortOrder === "asc" ? 1 : -1;
  }

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  const [totalItems, data] = await Promise.all([
    Sale.countDocuments(filter),
    Sale.find(filter).sort(sort).skip(skip).limit(limitNum).lean()
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / limitNum));

  return {
    data,
    page: pageNum,
    totalPages,
    totalItems
  };
};
