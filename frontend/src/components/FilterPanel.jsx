const FilterPanel = ({ filters, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="filter-panel">
      <h3>Filters</h3>

      <label>
        Customer Region
        <input
          type="text"
          value={filters.region || ""}
          onChange={(e) => handleChange("region", e.target.value)}
        />
      </label>

      <label>
        Gender
        <select
          value={filters.gender || ""}
          onChange={(e) => handleChange("gender", e.target.value)}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>

      <label>
        Age Min
        <input
          type="number"
          value={filters.ageMin || ""}
          onChange={(e) => handleChange("ageMin", e.target.value)}
        />
      </label>

      <label>
        Age Max
        <input
          type="number"
          value={filters.ageMax || ""}
          onChange={(e) => handleChange("ageMax", e.target.value)}
        />
      </label>

      <label>
        Product Category
        <input
          type="text"
          value={filters.category || ""}
          onChange={(e) => handleChange("category", e.target.value)}
        />
      </label>

      <label>
        Tags (comma separated)
        <input
          type="text"
          value={filters.tags || ""}
          onChange={(e) => handleChange("tags", e.target.value)}
        />
      </label>

      <label>
        Payment Method
        <input
          type="text"
          value={filters.paymentMethod || ""}
          onChange={(e) => handleChange("paymentMethod", e.target.value)}
        />
      </label>

      <label>
        Start Date
        <input
          type="date"
          value={filters.startDate || ""}
          onChange={(e) => handleChange("startDate", e.target.value)}
        />
      </label>

      <label>
        End Date
        <input
          type="date"
          value={filters.endDate || ""}
          onChange={(e) => handleChange("endDate", e.target.value)}
        />
      </label>
    </div>
  );
};

export default FilterPanel;
