# Architecture – TruEstate Retail Sales Management

## Backend Architecture

- **Tech**: Node.js, Express
- **Entry point**: `backend/src/index.js`
- **Layers**:
  - **Routes** (`src/routes/salesRoutes.js`)
    - Maps `GET /api/sales` to controller.
  - **Controller** (`src/controllers/salesController.js`)
    - Parses query params, builds a query object with search, filters, sort, and pagination.
  - **Service** (`src/services/salesService.js`)
    - Fetches in-memory dataset and delegates to filtering/sorting utility.
  - **Utils**
    - `dataLoader.js` – Reads CSV dataset once at startup, normalizes field names, caches in memory.
    - `filters.js` – Single source of truth for search, multi-filter, sorting, and pagination logic.

### Data Flow (Backend)

1. Client sends `GET /api/sales?search=...&region=...&sortBy=date&page=1`.
2. Route forwards to `getSales` controller.
3. Controller builds `query` object and calls `fetchSales(query)`.
4. `fetchSales` loads dataset via `getSalesData()`.
5. `applyQuery()` runs search, filters, sorting, and pagination.
6. Paginated result is returned to controller → JSON response to client.

---

## Frontend Architecture

- **Tech**: React + Vite
- **Entry**: `src/main.jsx` → `App.jsx` → `pages/Home.jsx`

### Components

- `SearchBar`
  - Text input; updates `search` state.
- `FilterPanel`
  - Controls for region, gender, age range, category, tags, payment method, date range.
- `SortDropdown`
  - Dropdown with Date (Newest), Quantity, Customer Name.
- `SalesTable`
  - Displays transactions in tabular form.
- `PaginationControls`
  - Next/Previous with current page and total pages.

### Hooks

- `useSalesQuery`
  - Accepts query object (search, filters, sorting, page, limit).
  - Calls backend via `fetchSales` and exposes `data`, `pageInfo`, `loading`, `error`.

### Services

- `services/api.js`
  - Axios instance and `fetchSales(params)` wrapper.

### UI Layout

- **Header** – Title bar.
- **Content** – Two-column layout:
  - Left: SearchBar + FilterPanel.
  - Right: SortDropdown + SalesTable + PaginationControls.

---

## Folder Structure Summary

- `backend/src/controllers` – HTTP-level logic.
- `backend/src/services` – Business logic.
- `backend/src/utils` – Reusable helpers (data loading, filters).
- `frontend/src/components` – Reusable UI building blocks.
- `frontend/src/pages` – Page-level layout and orchestration.
- `frontend/src/hooks` – Data fetching hook for sales.
- `frontend/src/services` – API layer.
- `frontend/src/styles` – Styles for layout and components.

---

## Responsibilities

- **Backend**
  - Interpret CSV dataset as structured sales data.
  - Implement combined search, filter, sort, pagination in a performant way (single pass pipeline).
  - Handle edge cases (no results, invalid ranges, conflicting filters) gracefully.

- **Frontend**
  - Provide a clean UI aligned with Figma structure (search bar, filter panel, table, sorting, pagination).
  - Maintain client-side state so search/filters/sorting persist across pages.
  - Display edge cases clearly (no results, loading, errors).
