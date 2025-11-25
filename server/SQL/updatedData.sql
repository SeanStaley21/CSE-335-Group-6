USE `Group 6`;

-- Add more stock data for variety
INSERT INTO stocks (symbol, company_name, sector, industry, current_price) VALUES
('AMZN', 'Amazon.com Inc.', 'Consumer Cyclical', 'Internet Retail', 145.67),
('NVDA', 'NVIDIA Corporation', 'Technology', 'Semiconductors', 495.22),
('META', 'Meta Platforms Inc.', 'Technology', 'Internet Content & Information', 325.18),
('JPM', 'JPMorgan Chase & Co.', 'Financial Services', 'Banks', 152.30),
('V', 'Visa Inc.', 'Financial Services', 'Credit Services', 245.89),
('WMT', 'Walmart Inc.', 'Consumer Defensive', 'Discount Stores', 165.42),
('JNJ', 'Johnson & Johnson', 'Healthcare', 'Drug Manufacturers', 158.75),
('PG', 'Procter & Gamble Co.', 'Consumer Defensive', 'Household Products', 145.32),
('DIS', 'The Walt Disney Company', 'Communication Services', 'Entertainment', 95.48),
('NFLX', 'Netflix Inc.', 'Communication Services', 'Entertainment', 445.67),
('KO', 'The Coca-Cola Company', 'Consumer Defensive', 'Beverages', 58.92),
('PEP', 'PepsiCo Inc.', 'Consumer Defensive', 'Beverages', 172.35),
('BA', 'The Boeing Company', 'Industrials', 'Aerospace & Defense', 215.89),
('GE', 'General Electric Company', 'Industrials', 'Conglomerates', 125.43),
('XOM', 'Exxon Mobil Corporation', 'Energy', 'Oil & Gas', 112.65);

-- Add more portfolios for Mohamed Muse (user_id: 1)
INSERT INTO portfolios (user_id, portfolio_name, description, cash_balance) VALUES
(1, 'Tech Giants', 'Investment in major technology companies', 12000.00),
(1, 'Energy Sector', 'Focus on energy and oil stocks', 7500.00),
(1, 'Healthcare Focus', 'Healthcare and pharmaceutical investments', 9000.00),
(1, 'Consumer Goods', 'Consumer defensive stocks', 6500.00),
(1, 'Financial Services', 'Banking and financial sector', 11000.00),
(1, 'Entertainment & Media', 'Media and entertainment stocks', 8500.00),
(1, 'Industrial Portfolio', 'Industrial and manufacturing stocks', 7000.00),
(1, 'Blue Chip Portfolio', 'Established large-cap stocks', 15000.00),
(1, 'AI & Innovation', 'Artificial intelligence and tech innovation', 13500.00),
(1, 'Retirement Fund', 'Long-term stable investments', 20000.00);

-- Add more portfolios for Inesh Rajwade (user_id: 2)
INSERT INTO portfolios (user_id, portfolio_name, description, cash_balance) VALUES
(2, 'High Growth Tech', 'Aggressive growth technology stocks', 14000.00),
(2, 'Dividend Income', 'High dividend-yielding stocks', 10000.00),
(2, 'E-Commerce Leaders', 'Leading e-commerce companies', 8500.00),
(2, 'Semiconductor Focus', 'Chip manufacturers and tech hardware', 12500.00),
(2, 'Streaming Services', 'Media streaming platforms', 6000.00),
(2, 'Value Stocks', 'Undervalued market opportunities', 9500.00),
(2, 'International Mix', 'Diversified international holdings', 11500.00),
(2, 'Small Cap Growth', 'Small-cap high potential stocks', 7500.00),
(2, 'ESG Portfolio', 'Environmental and socially responsible investing', 10500.00),
(2, 'Index Fund Mix', 'Diversified index tracking', 18000.00);

-- Add more portfolios for Sean Staley (user_id: 3)
INSERT INTO portfolios (user_id, portfolio_name, description, cash_balance) VALUES
(3, 'Aggressive Growth', 'High-risk, high-reward investments', 15000.00),
(3, 'Conservative Mix', 'Low-risk stable investments', 12000.00),
(3, 'Tech & Finance', 'Technology and financial sector blend', 10500.00),
(3, 'Monthly Dividend', 'Monthly dividend payment stocks', 9000.00),
(3, 'Market Leaders', 'Top performers in each sector', 16000.00),
(3, 'Emerging Tech', 'New technology and innovation', 8000.00),
(3, 'Consumer Staples', 'Essential consumer goods', 7500.00),
(3, 'Healthcare & Pharma', 'Medical and pharmaceutical investments', 11000.00),
(3, 'Energy & Utilities', 'Energy sector and utilities', 8500.00),
(3, 'Global Portfolio', 'International market exposure', 14500.00);

-- Add holdings for Mohamed's new portfolios
-- Tech Giants (portfolio_id: 5)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(5, 5, 30, 142.00),  -- AMZN
(5, 6, 20, 480.00),  -- NVDA
(5, 7, 25, 310.00),  -- META
(5, 3, 35, 372.00);  -- MSFT

-- Energy Sector (portfolio_id: 6)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(6, 19, 100, 108.50); -- XOM

-- Healthcare Focus (portfolio_id: 7)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(7, 11, 50, 155.00); -- JNJ

-- Consumer Goods (portfolio_id: 8)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(8, 12, 60, 142.00),  -- PG
(8, 15, 200, 57.50),  -- KO
(8, 16, 40, 168.00);  -- PEP

-- Financial Services (portfolio_id: 9)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(9, 8, 45, 148.00),  -- JPM
(9, 9, 30, 238.00);  -- V

-- Entertainment & Media (portfolio_id: 10)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(10, 13, 80, 92.00),  -- DIS
(10, 14, 15, 430.00); -- NFLX

-- Industrial Portfolio (portfolio_id: 11)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(11, 17, 35, 208.00),  -- BA
(11, 18, 55, 118.00);  -- GE

-- Blue Chip Portfolio (portfolio_id: 12)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(12, 1, 60, 168.00),  -- AAPL
(12, 3, 40, 370.00),  -- MSFT
(12, 8, 50, 145.00);  -- JPM

-- AI & Innovation (portfolio_id: 13)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(13, 6, 25, 475.00),  -- NVDA
(13, 7, 30, 305.00),  -- META
(13, 3, 20, 375.00);  -- MSFT

-- Retirement Fund (portfolio_id: 14)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(14, 1, 80, 165.00),  -- AAPL
(14, 11, 70, 152.00),  -- JNJ
(14, 12, 75, 140.00),  -- PG
(14, 10, 90, 162.00);  -- WMT

-- Add holdings for Inesh's new portfolios
-- High Growth Tech (portfolio_id: 15)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(15, 6, 35, 485.00),  -- NVDA
(15, 4, 40, 242.00),  -- TSLA
(15, 7, 28, 315.00);  -- META

-- Dividend Income (portfolio_id: 16)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(16, 11, 65, 154.00),  -- JNJ
(16, 12, 80, 141.00),  -- PG
(16, 15, 250, 58.00);  -- KO

-- E-Commerce Leaders (portfolio_id: 17)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(17, 5, 45, 140.00),  -- AMZN
(17, 10, 55, 160.00); -- WMT

-- Semiconductor Focus (portfolio_id: 18)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(18, 6, 40, 478.00),  -- NVDA
(18, 3, 30, 368.00);  -- MSFT

-- Streaming Services (portfolio_id: 19)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(19, 14, 20, 435.00),  -- NFLX
(19, 13, 70, 90.00);   -- DIS

-- Value Stocks (portfolio_id: 20)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(20, 17, 40, 210.00),  -- BA
(20, 18, 65, 120.00),  -- GE
(20, 13, 85, 88.00);   -- DIS

-- International Mix (portfolio_id: 21)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(21, 1, 45, 170.00),  -- AAPL
(21, 5, 35, 143.00),  -- AMZN
(21, 8, 40, 150.00);  -- JPM

-- Small Cap Growth (portfolio_id: 22)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(22, 4, 30, 240.00),  -- TSLA
(22, 18, 70, 122.00); -- GE

-- ESG Portfolio (portfolio_id: 23)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(23, 4, 25, 246.00),  -- TSLA
(23, 11, 55, 156.00),  -- JNJ
(23, 12, 60, 143.00);  -- PG

-- Index Fund Mix (portfolio_id: 24)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(24, 1, 50, 169.00),  -- AAPL
(24, 3, 45, 371.00),  -- MSFT
(24, 2, 40, 139.00),  -- GOOGL
(24, 5, 35, 141.00);  -- AMZN

-- Add holdings for Sean's new portfolios
-- Aggressive Growth (portfolio_id: 25)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(25, 4, 50, 244.00),  -- TSLA
(25, 6, 30, 482.00),  -- NVDA
(25, 14, 18, 438.00); -- NFLX

-- Conservative Mix (portfolio_id: 26)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(26, 11, 75, 153.00),  -- JNJ
(26, 12, 85, 142.00),  -- PG
(26, 15, 300, 58.25);  -- KO

-- Tech & Finance (portfolio_id: 27)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(27, 3, 35, 374.00),  -- MSFT
(27, 8, 45, 149.00),  -- JPM
(27, 9, 25, 240.00);  -- V

-- Monthly Dividend (portfolio_id: 28)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(28, 11, 60, 154.50),  -- JNJ
(28, 16, 50, 170.00),  -- PEP
(28, 9, 35, 242.00);   -- V

-- Market Leaders (portfolio_id: 29)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(29, 1, 70, 167.00),  -- AAPL
(29, 3, 50, 373.00),  -- MSFT
(29, 5, 40, 144.00),  -- AMZN
(29, 6, 22, 488.00);  -- NVDA

-- Emerging Tech (portfolio_id: 30)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(30, 6, 28, 490.00),  -- NVDA
(30, 7, 32, 318.00),  -- META
(30, 4, 25, 247.00);  -- TSLA

-- Consumer Staples (portfolio_id: 31)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(31, 10, 65, 163.00),  -- WMT
(31, 15, 280, 58.50),  -- KO
(31, 16, 45, 169.00);  -- PEP

-- Healthcare & Pharma (portfolio_id: 32)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(32, 11, 80, 155.50); -- JNJ

-- Energy & Utilities (portfolio_id: 33)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(33, 19, 120, 110.00); -- XOM

-- Global Portfolio (portfolio_id: 34)
INSERT INTO holdings (portfolio_id, stock_id, quantity, average_cost) VALUES
(34, 1, 55, 171.00),  -- AAPL
(34, 2, 38, 138.00),  -- GOOGL
(34, 5, 42, 142.00),  -- AMZN
(34, 8, 48, 147.00),  -- JPM
(34, 9, 30, 243.00);  -- V
