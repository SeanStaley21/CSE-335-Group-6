import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// ==================== AUTH ROUTES ====================

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Get user from database
    const [users] = await pool.query(
      'SELECT user_id, username, email, password_hash, first_name, last_name, is_active FROM users WHERE username = ? AND is_active = TRUE',
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = users[0];

    // Compare password with hash
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Remove password_hash from response
    delete user.password_hash;

    // Return user info (in a real app, you'd also return a JWT token)
    res.json({
      message: 'Login successful',
      user: user
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ==================== USER ROUTES ====================

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT user_id, username, email, first_name, last_name, created_at, is_active FROM users WHERE is_active = TRUE'
    );
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT user_id, username, email, first_name, last_name, created_at, is_active FROM users WHERE user_id = ? AND is_active = TRUE',
      [req.params.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(users[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ==================== PORTFOLIO ROUTES ====================

// Get all portfolios for a user
app.get('/api/users/:userId/portfolios', async (req, res) => {
  try {
    const [portfolios] = await pool.query(
      'SELECT * FROM portfolios WHERE user_id = ? AND is_active = TRUE ORDER BY created_at DESC',
      [req.params.userId]
    );
    res.json(portfolios);
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    res.status(500).json({ error: 'Failed to fetch portfolios' });
  }
});

// Get single portfolio by ID
app.get('/api/portfolios/:id', async (req, res) => {
  try {
    const [portfolios] = await pool.query(
      'SELECT * FROM portfolios WHERE portfolio_id = ? AND is_active = TRUE',
      [req.params.id]
    );
    
    if (portfolios.length === 0) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    
    res.json(portfolios[0]);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// Create new portfolio
app.post('/api/portfolios', async (req, res) => {
  const { user_id, portfolio_name, description, cash_balance } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO portfolios (user_id, portfolio_name, description, cash_balance) VALUES (?, ?, ?, ?)',
      [user_id, portfolio_name, description || null, cash_balance || 0]
    );
    
    res.status(201).json({
      portfolio_id: result.insertId,
      message: 'Portfolio created successfully'
    });
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({ error: 'Failed to create portfolio' });
  }
});

// ==================== STOCK ROUTES ====================

// Get all stocks
app.get('/api/stocks', async (req, res) => {
  try {
    const [stocks] = await pool.query(
      'SELECT * FROM stocks WHERE is_active = TRUE ORDER BY symbol'
    );
    res.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
});

// Get stock by symbol
app.get('/api/stocks/symbol/:symbol', async (req, res) => {
  try {
    const [stocks] = await pool.query(
      'SELECT * FROM stocks WHERE symbol = ? AND is_active = TRUE',
      [req.params.symbol.toUpperCase()]
    );
    
    if (stocks.length === 0) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    
    res.json(stocks[0]);
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({ error: 'Failed to fetch stock' });
  }
});

// ==================== HOLDINGS ROUTES ====================

// Get all holdings for a portfolio
app.get('/api/portfolios/:portfolioId/holdings', async (req, res) => {
  try {
    const [holdings] = await pool.query(`
      SELECT 
        h.holding_id,
        h.portfolio_id,
        h.stock_id,
        h.quantity,
        h.average_cost,
        h.current_value,
        h.purchase_date,
        s.symbol,
        s.company_name,
        s.current_price,
        s.sector,
        (s.current_price * h.quantity) as market_value,
        ((s.current_price - h.average_cost) * h.quantity) as total_gain_loss,
        (((s.current_price - h.average_cost) / h.average_cost) * 100) as gain_loss_percentage
      FROM holdings h
      JOIN stocks s ON h.stock_id = s.stock_id
      WHERE h.portfolio_id = ?
      ORDER BY h.purchase_date DESC
    `, [req.params.portfolioId]);
    
    res.json(holdings);
  } catch (error) {
    console.error('Error fetching holdings:', error);
    res.status(500).json({ error: 'Failed to fetch holdings' });
  }
});

// Add new holding
app.post('/api/holdings', async (req, res) => {
  const { portfolio_id, stock_id, quantity, average_cost } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES (?, ?, ?, ?)',
      [portfolio_id, stock_id, quantity, average_cost]
    );
    
    res.status(201).json({
      holding_id: result.insertId,
      message: 'Holding added successfully'
    });
  } catch (error) {
    console.error('Error adding holding:', error);
    res.status(500).json({ error: 'Failed to add holding' });
  }
});

// Update holding quantity
app.put('/api/holdings/:id', async (req, res) => {
  const { quantity, average_cost } = req.body;
  
  try {
    await pool.query(
      'UPDATE holdings SET quantity = ?, average_cost = ? WHERE holding_id = ?',
      [quantity, average_cost, req.params.id]
    );
    
    res.json({ message: 'Holding updated successfully' });
  } catch (error) {
    console.error('Error updating holding:', error);
    res.status(500).json({ error: 'Failed to update holding' });
  }
});

// Delete holding
app.delete('/api/holdings/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM holdings WHERE holding_id = ?', [req.params.id]);
    res.json({ message: 'Holding deleted successfully' });
  } catch (error) {
    console.error('Error deleting holding:', error);
    res.status(500).json({ error: 'Failed to delete holding' });
  }
});

// ==================== DASHBOARD STATS ====================

// Get dashboard statistics for a user
app.get('/api/users/:userId/dashboard', async (req, res) => {
  try {
    // Get portfolio count and cash balance
    const [portfolioStats] = await pool.query(`
      SELECT 
        COUNT(*) as total_portfolios,
        SUM(cash_balance) as total_cash
      FROM portfolios 
      WHERE user_id = ? AND is_active = TRUE
    `, [req.params.userId]);
    
    // Calculate total value from actual holdings
    const [holdingsValue] = await pool.query(`
      SELECT 
        COALESCE(SUM(s.current_price * h.quantity), 0) as total_portfolio_value
      FROM holdings h
      JOIN stocks s ON h.stock_id = s.stock_id
      JOIN portfolios p ON h.portfolio_id = p.portfolio_id
      WHERE p.user_id = ? AND p.is_active = TRUE
    `, [req.params.userId]);
    
    // Get total holdings count
    const [holdingsStats] = await pool.query(`
      SELECT COUNT(DISTINCT h.stock_id) as unique_stocks
      FROM holdings h
      JOIN portfolios p ON h.portfolio_id = p.portfolio_id
      WHERE p.user_id = ?
    `, [req.params.userId]);
    
    res.json({
      ...portfolioStats[0],
      total_portfolio_value: holdingsValue[0].total_portfolio_value,
      ...holdingsStats[0]
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API documentation: http://localhost:${PORT}/api/health`);
});
