# Stock Portfolio Application - Setup Guide

This guide will help you connect your MySQL database to the React frontend.

## What I've Created:

### 1. **Backend Server** (`/server` folder)
- Node.js/Express API server
- Connects to your MySQL database
- Provides REST API endpoints for the frontend

### 2. **API Service** (`/src/services/api.js`)
- JavaScript functions to call the backend API
- Easy-to-use methods for fetching data

### 3. **Updated Pages**
- `Dashboard.jsx` - Now fetches real user and portfolio data
- `PortfolioList.jsx` - Shows actual portfolios from database
- `Portfolio.jsx` - Needs manual update (see below)

---

## Setup Instructions:

### Step 1: Create the MySQL Database

1. Open MySQL Workbench or command line
2. Create the database:
   ```sql
   CREATE DATABASE stock_portfolio;
   USE stock_portfolio;
   ```
3. Run the SQL script from `SQL/tableCreation.sql`

### Step 2: Configure Backend

1. Navigate to the server folder:
   ```powershell
   cd server
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Update the `.env` file with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=stock_portfolio
   DB_PORT=3306
   PORT=3001
   ```

4. Start the backend server:
   ```powershell
   npm run dev
   ```

   You should see:
   ```
   ✅ Database connected successfully
   🚀 Server running on http://localhost:3001
   ```

### Step 3: Start Frontend

1. Open a NEW terminal (keep the backend running)
2. Navigate to the project root (not the server folder):
   ```powershell
   cd ..
   ```

3. Install dependencies (if not already done):
   ```powershell
   npm install
   ```

4. Start the React app:
   ```powershell
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

---

## API Endpoints Available:

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/:userId/dashboard` - Get dashboard statistics

### Portfolios
- `GET /api/users/:userId/portfolios` - Get all portfolios for a user
- `GET /api/portfolios/:id` - Get portfolio by ID
- `POST /api/portfolios` - Create new portfolio

### Stocks
- `GET /api/stocks` - Get all stocks
- `GET /api/stocks/symbol/:symbol` - Get stock by symbol

### Holdings
- `GET /api/portfolios/:portfolioId/holdings` - Get holdings for portfolio
- `POST /api/holdings` - Add new holding
- `PUT /api/holdings/:id` - Update holding
- `DELETE /api/holdings/:id` - Delete holding

---

## How to Use in React Components:

```javascript
import { userAPI, portfolioAPI, stockAPI, holdingsAPI } from './services/api';

// In your component:
useEffect(() => {
  async function fetchData() {
    try {
      // Get user
      const user = await userAPI.getById(1);
      
      // Get portfolios
      const portfolios = await portfolioAPI.getByUser(1);
      
      // Get holdings for a portfolio
      const holdings = await holdingsAPI.getByPortfolio(portfolioId);
      
      // Update state
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  fetchData();
}, []);
```

---

## Sample Data

The database is pre-populated with:
- 3 users: Mohamed Muse, Inesh Rajwade, Sean Staley
- 4 stocks: AAPL, GOOGL, MSFT, TSLA
- 4 portfolios with various holdings

---

## Troubleshooting:

### "Failed to load data" error:
1. Make sure MySQL is running
2. Check database credentials in `server/.env`
3. Verify backend server is running on port 3001
4. Check browser console for specific error messages

### Database connection failed:
1. Verify MySQL credentials
2. Make sure database `stock_portfolio` exists
3. Check if MySQL is running on port 3306

### CORS errors:
The backend has CORS enabled for all origins (development only)

---

## Next Steps:

1. **Update Portfolio.jsx** - Replace the dummy data with API calls (similar to PortfolioList.jsx)
2. **Add Authentication** - Implement user login/logout
3. **Create Forms** - Add UI for creating portfolios and holdings
4. **Stock Price Updates** - Integrate real-time stock price API
5. **Charts** - Connect StockChart component to real data

---

## File Structure:

```
project-root/
├── server/              # Backend API
│   ├── server.js       # Main server file
│   ├── db.js           # Database connection
│   ├── .env            # Database credentials
│   └── package.json    # Backend dependencies
├── src/
│   ├── services/
│   │   └── api.js      # API service functions
│   └── pages/
│       ├── Dashboard.jsx       # ✅ Updated
│       ├── PortfolioList.jsx   # ✅ Updated
│       └── Portfolio.jsx       # ⚠️ Needs manual update
└── SQL/
    └── tableCreation.sql   # Database schema
```

---

## Questions?

Check the error messages in:
1. Browser console (F12)
2. Backend terminal output
3. MySQL error logs
