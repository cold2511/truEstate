

export const applyQuery = (data, query) => {
  let filtered = [...data];

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
    page,
    limit
  } = query;

  // SEARCH (customer name , phone)
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter((item) => {
      const name = (item.customerName || "").toLowerCase();
      const phone = (item.phoneNumber || "").toLowerCase();
      return name.includes(s) || phone.includes(s);
    });
  }

  // FILTERS
  if (region) {
    filtered = filtered.filter(
      (item) => item.customerRegion && item.customerRegion === region
    );
  }

  if (gender) {
    filtered = filtered.filter(
      (item) => item.gender && item.gender.toLowerCase() === gender.toLowerCase()
    );
  }

  if (ageMin !== null && ageMin !== undefined) {
    filtered = filtered.filter(
      (item) => item.age !== null && item.age >= ageMin
    );
  }

  if (ageMax !== null && ageMax !== undefined) {
    filtered = filtered.filter(
      (item) => item.age !== null && item.age <= ageMax
    );
  }

  if (category) {
    filtered = filtered.filter(
      (item) =>
        item.productCategory &&
        item.productCategory.toLowerCase() === category.toLowerCase()
    );
  }

  if (tags && tags.length > 0) {
    filtered = filtered.filter((item) => {
      if (!item.tags || item.tags.length === 0) return false;
      
      return tags.every((t) =>
        item.tags.map((x) => x.toLowerCase()).includes(t.toLowerCase())
      );
    });
  }

  if (paymentMethod) {
    filtered = filtered.filter(
      (item) =>
        item.paymentMethod &&
        item.paymentMethod.toLowerCase() === paymentMethod.toLowerCase()
    );
  }

  // Date range
  const parseDate = (d) => (d ? new Date(d) : null);
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (start) {
    filtered = filtered.filter((item) => {
      const d = parseDate(item.date);
      return d && d >= start;
    });
  }

  if (end) {
    filtered = filtered.filter((item) => {
      const d = parseDate(item.date);
      return d && d <= end;
    });
  }

  //  SORTING 
  if (sortBy) {
    const order = sortOrder === "asc" ? 1 : -1;

    filtered.sort((a, b) => {
      if (sortBy === "date") {
        const da = new Date(a.date);
        const db = new Date(b.date);
        return (da - db) * order;
      }

      if (sortBy === "quantity") {
        return (a.quantity - b.quantity) * order;
      }

      if (sortBy === "customerName") {
        const na = (a.customerName || "").toLowerCase();
        const nb = (b.customerName || "").toLowerCase();
        if (na < nb) return -1 * order;
        if (na > nb) return 1 * order;
        return 0;
      }

      return 0;
    });
  }

  //  PAGINATION 
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  const pageItems = filtered.slice(startIndex, endIndex);

  return {
    data: pageItems,
    page: currentPage,
    totalPages,
    totalItems
  };
};
