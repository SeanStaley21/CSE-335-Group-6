# Stock Portfolio Backend API

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Database
1. Create a MySQL database named `stock_portfolio`
2. Run the SQL script from `../SQL/tableCreation.sql`
3. Update `.env` file with your database credentials

### 3. Start Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on http://localhost:3001

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/:userId/dashboard` - Get dashboard stats

### Portfolios
- `GET /api/users/:userId/portfolios` - Get all portfolios for user
- `GET /api/portfolios/:id` - Get portfolio by ID
- `POST /api/portfolios` - Create new portfolio

### Stocks
- `GET /api/stocks` - Get all stocks
- `GET /api/stocks/symbol/:symbol` - Get stock by symbol

### Holdings
- `GET /api/portfolios/:portfolioId/holdings` - Get all holdings for portfolio
- `POST /api/holdings` - Add new holding
- `PUT /api/holdings/:id` - Update holding
- `DELETE /api/holdings/:id` - Delete holding

## Environment Variables
See `.env.example` for required configuration.
