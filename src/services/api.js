// API base URL - update this if your backend runs on a different port
const API_BASE_URL = 'http://localhost:3001/api';

// Helper function for making API calls
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ==================== USER API ====================

export const userAPI = {
  // Get all users
  getAll: () => fetchAPI('/users'),

  // Get user by ID
  getById: (userId) => fetchAPI(`/users/${userId}`),

  // Get dashboard stats for a user
  getDashboard: (userId) => fetchAPI(`/users/${userId}/dashboard`),
};

// ==================== PORTFOLIO API ====================

export const portfolioAPI = {
  // Get all portfolios for a user
  getByUser: (userId) => fetchAPI(`/users/${userId}/portfolios`),

  // Get single portfolio
  getById: (portfolioId) => fetchAPI(`/portfolios/${portfolioId}`),

  // Create new portfolio
  create: (portfolioData) =>
    fetchAPI('/portfolios', {
      method: 'POST',
      body: JSON.stringify(portfolioData),
    }),
};

// ==================== STOCK API ====================

export const stockAPI = {
  // Get all stocks
  getAll: () => fetchAPI('/stocks'),

  // Get stock by symbol
  getBySymbol: (symbol) => fetchAPI(`/stocks/symbol/${symbol}`),
};

// ==================== HOLDINGS API ====================

export const holdingsAPI = {
  // Get all holdings for a portfolio
  getByPortfolio: (portfolioId) =>
    fetchAPI(`/portfolios/${portfolioId}/holdings`),

  // Add new holding
  create: (holdingData) =>
    fetchAPI('/holdings', {
      method: 'POST',
      body: JSON.stringify(holdingData),
    }),

  // Update holding
  update: (holdingId, holdingData) =>
    fetchAPI(`/holdings/${holdingId}`, {
      method: 'PUT',
      body: JSON.stringify(holdingData),
    }),

  // Delete holding
  delete: (holdingId) =>
    fetchAPI(`/holdings/${holdingId}`, {
      method: 'DELETE',
    }),
};

// ==================== EXAMPLE USAGE ====================
/*

// In your React components:

import { userAPI, portfolioAPI, stockAPI, holdingsAPI } from './services/api';

// Get user data
const user = await userAPI.getById(1);

// Get user's portfolios
const portfolios = await portfolioAPI.getByUser(1);

// Get portfolio holdings
const holdings = await holdingsAPI.getByPortfolio(1);

// Get all stocks
const stocks = await stockAPI.getAll();

// Create new portfolio
const newPortfolio = await portfolioAPI.create({
  user_id: 1,
  portfolio_name: 'My New Portfolio',
  description: 'Test portfolio',
  cash_balance: 10000
});

// Add holding to portfolio
const newHolding = await holdingsAPI.create({
  portfolio_id: 1,
  stock_id: 1,
  quantity: 10,
  average_cost: 150.00
});

*/
