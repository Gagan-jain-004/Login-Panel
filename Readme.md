# 📊 MERN Admin Dashboard

An **Admin Dashboard** built with **MERN stack** (MongoDB, Express.js, React, Node.js) that allows administrators to **view, manage, and export departmental data** in Excel format.
Includes visual statistics, filters, and department-wise breakdowns.

---

## 🚀 Features

* 📌 **Department Statistics**

  * School, IT, Dispatch, Accounts
  * Interested vs Not Interested tracking
* 📊 **Interactive Charts**

  * Department-wise bar chart with `recharts`
* 📂 **Excel Export**

  * Download full department data in `.xlsx` format
  * Cleaned & flattened JSON data
* 🔍 **Filters**

  * Search by name, email, etc.
  * Date filter
* ⚡ **Fast API**

  * Uses Axios with pagination and query parameters
* 🎨 **UI**

  * TailwindCSS + responsive design

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* Tailwind CSS
* Axios
* Recharts
* xlsx (Excel export)
* file-saver

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## 📦 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Gagan-jain-004/Login-Panel.git

```

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

---

## ⚙️ Configuration

1. Create a `.env` file in `server/` and add:

```env
MONGO_URI=mongodb://localhost:27017/dashboard
PORT=5000
JWT_SECRET=your_jwt_secret
```

2. Make sure MongoDB is running:

```bash
mongod
```

---

## ▶️ Running the Project

**Backend**

```bash
cd backend
npm run server
```

**Frontend**

```bash
cd frontend
npm run dev
```

App runs on:
Frontend → `http://localhost:5173/`
Backend → `http://localhost:4000`

---

## 📤 Export to Excel

On any department page, click:

```
Download Excel
```

* Fetches **all records** from the API
* Removes sensitive fields
* Saves as `.xlsx` file
* Can be opened in Excel or Google Sheets

---

## 📜 License

MIT License © 2025 \[Gagan Jain]

---