-- Stock Portfolio Database Views

CREATE OR REPLACE VIEW view_user_portfolio_summary AS
SELECT 
    u.user_id,
    u.username,
    u.email,
    u.first_name,
    u.last_name,
    COUNT(p.portfolio_id) as total_portfolios,
    COALESCE(SUM(p.total_value), 0) as total_portfolio_value,
    COALESCE(SUM(p.cash_balance), 0) as total_cash_balance,
    COALESCE(SUM(p.total_value + p.cash_balance), 0) as total_net_worth
FROM users u
LEFT JOIN portfolios p ON u.user_id = p.user_id AND p.is_active = TRUE
WHERE u.is_active = TRUE
GROUP BY u.user_id, u.username, u.email, u.first_name, u.last_name;

CREATE OR REPLACE VIEW view_portfolio_holdings_detail AS
SELECT 
    p.portfolio_id,
    p.portfolio_name,
    p.user_id,
    u.username,
    u.first_name,
    u.last_name,
    h.holding_id,
    s.stock_id,
    s.symbol,
    s.company_name,
    s.sector,
    s.current_price,
    h.quantity,
    h.average_cost,
    h.current_value as cost_basis,
    (s.current_price * h.quantity) as market_value,
    ((s.current_price - h.average_cost) * h.quantity) as total_gain_loss,
    (((s.current_price - h.average_cost) / h.average_cost) * 100) as gain_loss_percentage,
    h.purchase_date
FROM holdings h
JOIN portfolios p ON h.portfolio_id = p.portfolio_id
JOIN users u ON p.user_id = u.user_id
JOIN stocks s ON h.stock_id = s.stock_id
WHERE p.is_active = TRUE AND s.is_active = TRUE
ORDER BY p.portfolio_id, s.symbol;

CREATE OR REPLACE VIEW view_portfolio_performance AS
SELECT 
    p.portfolio_id,
    p.portfolio_name,
    p.user_id,
    u.username,
    u.first_name,
    u.last_name,
    p.cash_balance,
    p.total_value as recorded_total_value,
    COUNT(h.holding_id) as number_of_holdings,
    COUNT(DISTINCT h.stock_id) as unique_stocks,
    COALESCE(SUM(h.quantity * h.average_cost), 0) as total_cost_basis,
    COALESCE(SUM(s.current_price * h.quantity), 0) as current_market_value,
    COALESCE(SUM((s.current_price - h.average_cost) * h.quantity), 0) as total_unrealized_gain_loss,
    CASE 
        WHEN SUM(h.quantity * h.average_cost) > 0 
        THEN (SUM((s.current_price - h.average_cost) * h.quantity) / SUM(h.quantity * h.average_cost)) * 100
        ELSE 0 
    END as portfolio_return_percentage,
    p.created_at as portfolio_created,
    p.updated_at as last_updated
FROM portfolios p
JOIN users u ON p.user_id = u.user_id
LEFT JOIN holdings h ON p.portfolio_id = h.portfolio_id
LEFT JOIN stocks s ON h.stock_id = s.stock_id
WHERE p.is_active = TRUE
GROUP BY p.portfolio_id, p.portfolio_name, p.user_id, u.username, u.first_name, u.last_name, 
         p.cash_balance, p.total_value, p.created_at, p.updated_at;

CREATE OR REPLACE VIEW view_stock_popularity AS
SELECT 
    s.stock_id,
    s.symbol,
    s.company_name,
    s.sector,
    s.current_price,
    COUNT(DISTINCT h.portfolio_id) as held_in_portfolios,
    COUNT(DISTINCT p.user_id) as held_by_users,
    COALESCE(SUM(h.quantity), 0) as total_shares_held,
    COALESCE(SUM(h.quantity * s.current_price), 0) as total_market_value
FROM stocks s
LEFT JOIN holdings h ON s.stock_id = h.stock_id
LEFT JOIN portfolios p ON h.portfolio_id = p.portfolio_id AND p.is_active = TRUE
WHERE s.is_active = TRUE
GROUP BY s.stock_id, s.symbol, s.company_name, s.sector, s.current_price
ORDER BY total_market_value DESC;

CREATE OR REPLACE VIEW view_top_performing_holdings AS
SELECT 
    u.username,
    p.portfolio_name,
    s.symbol,
    s.company_name,
    h.quantity,
    h.average_cost,
    s.current_price,
    (s.current_price * h.quantity) as current_value,
    ((s.current_price - h.average_cost) * h.quantity) as gain_loss,
    (((s.current_price - h.average_cost) / h.average_cost) * 100) as gain_loss_percentage,
    h.purchase_date
FROM holdings h
JOIN portfolios p ON h.portfolio_id = p.portfolio_id
JOIN users u ON p.user_id = u.user_id
JOIN stocks s ON h.stock_id = s.stock_id
WHERE p.is_active = TRUE AND s.is_active = TRUE
ORDER BY gain_loss_percentage DESC;

CREATE OR REPLACE VIEW view_user_activity AS
SELECT 
    u.user_id,
    u.username,
    u.email,
    u.first_name,
    u.last_name,
    u.created_at as account_created,
    COUNT(DISTINCT p.portfolio_id) as total_portfolios,
    COUNT(DISTINCT h.holding_id) as total_holdings,
    COUNT(DISTINCT h.stock_id) as unique_stocks_held,
    COALESCE(SUM(p.total_value), 0) as total_invested_value,
    u.is_active
FROM users u
LEFT JOIN portfolios p ON u.user_id = p.user_id AND p.is_active = TRUE
LEFT JOIN holdings h ON p.portfolio_id = h.portfolio_id
WHERE u.is_active = TRUE
GROUP BY u.user_id, u.username, u.email, u.first_name, u.last_name, u.created_at, u.is_active;

CREATE OR REPLACE VIEW view_stocks_list AS
SELECT 
    stock_id,
    symbol,
    company_name,
    sector,
    industry,
    current_price,
    market_cap,
    last_updated
FROM stocks
WHERE is_active = TRUE
ORDER BY symbol;

CREATE OR REPLACE VIEW view_user_portfolios AS
SELECT 
    p.portfolio_id,
    p.user_id,
    u.username,
    CONCAT(u.first_name, ' ', u.last_name) as user_full_name,
    p.portfolio_name,
    p.description,
    p.total_value,
    p.cash_balance,
    (p.total_value + p.cash_balance) as total_portfolio_worth,
    p.created_at,
    p.updated_at
FROM portfolios p
JOIN users u ON p.user_id = u.user_id
WHERE p.is_active = TRUE AND u.is_active = TRUE
ORDER BY u.username, p.portfolio_name;
