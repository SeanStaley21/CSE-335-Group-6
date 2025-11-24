-- Stock Portfolio Database Schema

-- Use the Group 6 database
USE `Group 6`;

-- Users table - stores user account information
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Stocks table - stores stock information
CREATE TABLE stocks (
    stock_id INT PRIMARY KEY AUTO_INCREMENT,
    symbol VARCHAR(10) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    sector VARCHAR(100),
    industry VARCHAR(100),
    market_cap DECIMAL(20, 2),
    current_price DECIMAL(10, 2) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Portfolios table - stores portfolio information for each user
CREATE TABLE portfolios (
    portfolio_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    portfolio_name VARCHAR(100) NOT NULL,
    description TEXT,
    total_value DECIMAL(15, 2) DEFAULT 0.00,
    cash_balance DECIMAL(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_portfolio (user_id, portfolio_name)
);

-- Holdings table - stores individual stock holdings in portfolios
CREATE TABLE holdings (
    holding_id INT PRIMARY KEY AUTO_INCREMENT,
    portfolio_id INT NOT NULL,
    stock_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    average_cost DECIMAL(10, 2) NOT NULL,
    current_value DECIMAL(15, 2) GENERATED ALWAYS AS (quantity * average_cost) STORED,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (portfolio_id) REFERENCES portfolios(portfolio_id) ON DELETE CASCADE,
    FOREIGN KEY (stock_id) REFERENCES stocks(stock_id) ON DELETE RESTRICT,
    UNIQUE KEY unique_portfolio_stock (portfolio_id, stock_id),
    CHECK (quantity >= 0),
    CHECK (average_cost > 0)
);

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_stocks_symbol ON stocks(symbol);
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_holdings_portfolio_id ON holdings(portfolio_id);
CREATE INDEX idx_holdings_stock_id ON holdings(stock_id);

-- Sample data inserts
INSERT INTO users (username, email, password_hash, first_name, last_name) VALUES
('mohamed_muse', 'momuse01@louisville.edu', 'mohamedMuse', 'Mohamed', 'Muse'),
('inesh_rajwade', 'imrajw01@louisville.edu', 'ineshRajwade', 'Inesh', 'Rajwade'),
('sean_staley', 'sstaley01@louisville.edu', 'seanStaley', 'Sean', 'Staley');

INSERT INTO stocks (symbol, company_name, sector, industry, current_price) VALUES
('AAPL', 'Apple Inc.', 'Technology', 'Consumer Electronics', 175.50),
('GOOGL', 'Alphabet Inc.', 'Technology', 'Internet Content & Information', 142.30),
('MSFT', 'Microsoft Corporation', 'Technology', 'Software', 378.85),
('TSLA', 'Tesla Inc.', 'Consumer Cyclical', 'Auto Manufacturers', 248.42);

INSERT INTO portfolios (user_id, portfolio_name, description, cash_balance) VALUES
(1, 'Growth Portfolio', 'Focus on high-growth technology stocks', 10000.00),
(1, 'Dividend Portfolio', 'Focus on dividend-paying stocks', 5000.00),
(2, 'Tech Portfolio', 'Technology sector investments', 15000.00),
(3, 'Balanced Portfolio', 'Diversified investment strategy', 8000.00);

INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(1, 1, 50, 170.00),  -- Mohamed's Growth Portfolio: 50 AAPL shares
(1, 2, 25, 140.00),  -- Mohamed's Growth Portfolio: 25 GOOGL shares
(2, 3, 30, 375.00),  -- Inesh's Tech Portfolio: 30 MSFT shares
(2, 4, 20, 245.00),  -- Inesh's Tech Portfolio: 20 TSLA shares
(3, 1, 40, 172.00),  -- Sean's Balanced Portfolio: 40 AAPL shares
(3, 3, 15, 380.00);  -- Sean's Balanced Portfolio: 15 MSFT shares

