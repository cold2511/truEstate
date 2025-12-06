const SortDropdown = ({ sortBy, sortOrder, onChange }) => {
  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === "date") onChange("date", "desc"); // newest first
    else if (value === "quantityAsc") onChange("quantity", "asc");
    else if (value === "quantityDesc") onChange("quantity", "desc");
    else if (value === "customerName") onChange("customerName", "asc");
  };

  const currentValue = (() => {
    if (sortBy === "date") return "date";
    if (sortBy === "quantity" && sortOrder === "asc") return "quantityAsc";
    if (sortBy === "quantity" && sortOrder === "desc") return "quantityDesc";
    if (sortBy === "customerName") return "customerName";
    return "";
  })();

  return (
    <div className="sort-dropdown">
      <select value={currentValue} onChange={handleSortChange}>
        <option value="">No Sorting</option>
        <option value="date">Date (Newest First)</option>
        <option value="quantityAsc">Quantity (Low → High)</option>
        <option value="quantityDesc">Quantity (High → Low)</option>
        <option value="customerName">Customer Name (A–Z)</option>
      </select>
    </div>
  );
};

export default SortDropdown;
