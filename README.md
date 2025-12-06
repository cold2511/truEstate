
📘 Retail Sales Management – Assignment

This project implements a Retail Sales Management System featuring powerful Search, Filtering, Sorting, and Pagination functionalities.
The system is built using React + Vite (Frontend) and Node.js + Express (Backend), with a CSV dataset as the data source.

This README explains the overall architecture, implementation, and setup steps.


---

📌 1. Overview

The Retail Sales Management application allows users to:

Search transactions by customer name or phone number

Filter transactions by region, gender, age range, category, payment method, tags, date range

Sort results by date (newest first), quantity, or customer name

Paginate results (10 items per page)

View results in a clean, interactive React UI


The backend efficiently performs all filtering, searching, sorting, and pagination on the dataset and exposes a simple REST API.


---

🛠 2. Tech Stack

Frontend

React 18

Vite

Axios

Custom hooks & modular components


Backend

Node.js + Express

CSV Parser (csv-parse)

Modular architecture (Controllers, Services, Utils)


Data

CSV dataset (trimmed sample used for demo)



---

🔍 3. Search Implementation

The backend supports full-text search on:

Customer Name

Phone Number


Search is:

Case-insensitive

Partial-match friendly

Combined with filters, sorting, and pagination


How search works:

if (search) {
  const s = search.toLowerCase();
  filtered = filtered.filter(
    (item) =>
      item.customerName.toLowerCase().includes(s) ||
      item.phoneNumber.toLowerCase().includes(s)
  );
}

The frontend simply sends the search parameter and resets the page to 1.


---

🧩 4. Filter Implementation

Filters supported:

Filter	Type

Customer Region	Text
Gender	Enum
Age Range	Min + Max
Product Category	Text
Tags	Multi-value (comma-separated)
Payment Method	Text
Date Range	startDate + endDate


Each filter is optional.
Filters are composable and work together.

Example logic:

if (region) filtered = filtered.filter((item) => item.customerRegion === region);
if (gender) filtered = filtered.filter((item) => item.gender === gender);
if (ageMin) filtered = filtered.filter((item) => item.age >= ageMin);
if (ageMax) filtered = filtered.filter((item) => item.age <= ageMax);

if (tags) {
  const t = Array.isArray(tags) ? tags : tags.split(",");
  filtered = filtered.filter((item) =>
    t.every((tag) => item.tags.includes(tag.trim()))
  );
}

if (startDate) filtered = filtered.filter((item) => item.date >= startDate);
if (endDate) filtered = filtered.filter((item) => item.date <= endDate);

Frontend provides clean input fields and updates filters via controlled state.


---

🔃 5. Sorting Implementation

Supported sorting options:

Date (Newest First) → sortBy=date&sortOrder=desc

Quantity (Low → High / High → Low)

Customer Name (A–Z)


Sorting occurs after filtering.

Example implementation:

if (sortBy === "date") {
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
} else if (sortBy === "quantity") {
  filtered.sort((a, b) => sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity);
} else if (sortBy === "customerName") {
  filtered.sort((a, b) => a.customerName.localeCompare(b.customerName));
}

Frontend exposes a dropdown to change sorting mode.


---

📄 6. Pagination Implementation

Pagination is performed in the backend using:

page

limit (fixed at 10)


Backend returns:

{
  "data": [...10 items...],
  "page": 1,
  "totalPages": 2,
  "totalItems": 20
}

Frontend shows:

Page number

Previous/Next buttons

Updates state without refreshing search or filters


Example:

const start = (page - 1) * limit;
const paginated = filtered.slice(start, start + limit);


---

🛠 7. Setup Instructions

Follow these steps to run the project locally.


---

🟦 Backend Setup

cd backend
npm install
npm run dev

Backend runs at:

http://localhost:5000


---

🟩 Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173


---

🔗 API Endpoint

GET /api/sales

Query parameters:

search
region
gender
ageMin
ageMax
category
tags
paymentMethod
startDate
endDate
sortBy
sortOrder
page
limit


---

📁 Project Structure

root/
 ├── backend/
 │    ├── src/
 │    │    ├── controllers/
 │    │    ├── services/
 │    │    ├── utils/
 │    │    └── routes/
 │    ├── data/sales.csv
 │    └── package.json
 ├── frontend/
 │    ├── src/
 │    │    ├── components/
 │    │    ├── pages/
 │    │    ├── hooks/
 │    │    ├── services/
 │    │    └── styles/
 │    └── package.json
 └── README.md
