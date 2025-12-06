import { useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import SortDropdown from "../components/SortDropdown";
import SalesTable from "../components/SalesTable";
import PaginationControls from "../components/PaginationControls";
import { useSalesQuery } from "../hooks/useSalesQuery";

const Home = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);

  const query = {
    search,
    region: filters.region || undefined,
    gender: filters.gender || undefined,
    ageMin: filters.ageMin || undefined,
    ageMax: filters.ageMax || undefined,
    category: filters.category || undefined,
    tags: filters.tags ? filters.tags.split(",").map((t) => t.trim()) : undefined,
    paymentMethod: filters.paymentMethod || undefined,
    startDate: filters.startDate || undefined,
    endDate: filters.endDate || undefined,
    sortBy,
    sortOrder,
    page,
    limit: 10
  };

  const { data, pageInfo, loading, error } = useSalesQuery(query);

  const handleFiltersChange = (updated) => {
    setFilters(updated);
    setPage(1);
  };

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setPage(1);
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="layout">
      <header className="header">
        <h1>Retail Sales Management</h1>
      </header>

      <div className="content">
        <aside className="sidebar">
          <SearchBar value={search} onChange={handleSearchChange} />
          <FilterPanel filters={filters} onChange={handleFiltersChange} />
        </aside>

        <main className="main">
          <div className="toolbar">
            <SortDropdown
              sortBy={sortBy}
              sortOrder={sortOrder}
              onChange={handleSortChange}
            />
          </div>

          {loading && <div>Loading...</div>}
          {error && <div className="error">{error}</div>}

          {!loading && !error && (
            <>
              <SalesTable data={data} />
              <PaginationControls
                page={pageInfo.page}
                totalPages={pageInfo.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
