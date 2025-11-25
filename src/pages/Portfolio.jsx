import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import StockChart from '../components/StockChart';
import AlertList from '../components/AlertList';
import TransactionTable from '../components/TransactionTable';
import { portfolioAPI, holdingAPI } from '../services/api';

export default function Portfolio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    async function fetchPortfolioData() {
      try {
        setLoading(true);
        
        // Fetch portfolio info and holdings in parallel
        const [portfolioData, holdingsData] = await Promise.all([
          portfolioAPI.getById(id),
          holdingAPI.getByPortfolio(id)
        ]);

        setPortfolio(portfolioData);
        setHoldings(holdingsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError('Failed to load portfolio. It may not exist or you may not have access.');
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolioData();
  }, [id, navigate]);

  if (loading) {
    return (
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px', textAlign: 'center' }}>
        <h2>Loading portfolio...</h2>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>
        <h1 style={{ textAlign: 'center' }}>Portfolio not found</h1>
        <p style={{ textAlign: 'center' }}>The portfolio "{id}" doesn't exist.</p>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link to="/portfolio" style={{ color: '#2563eb' }}>Back to portfolios</Link>
        </div>
      </div>
    );
  }

  // Calculate total portfolio value
  const totalMarketValue = holdings.reduce((sum, h) => sum + (h.market_value || 0), 0);
  const totalCost = holdings.reduce((sum, h) => sum + (h.average_cost * h.quantity), 0);
  const totalGainLoss = totalMarketValue - totalCost;
  const totalGainLossPercent = totalCost > 0 ? ((totalGainLoss / totalCost) * 100) : 0;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>
      <Link to="/portfolio" style={{ color: '#2563eb' }}>← Back to portfolios</Link>
      <h1 style={{ textAlign: 'center', marginTop: '8px' }}>{portfolio.portfolio_name}</h1>
      {portfolio.description && (
        <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '8px' }}>
          {portfolio.description}
        </p>
      )}

      {/* Portfolio Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginTop: '24px',
        padding: '20px',
        backgroundColor: '#f9fafb',
        borderRadius: '12px'
      }}>
        <div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Market Value</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '4px' }}>
            ${totalMarketValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Cash Balance</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '4px' }}>
            ${(portfolio.cash_balance || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Gain/Loss</div>
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            marginTop: '4px',
            color: totalGainLoss >= 0 ? '#15803d' : '#dc2626'
          }}>
            {totalGainLoss >= 0 ? '+' : ''}{totalGainLoss.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            <span style={{ fontSize: '16px', marginLeft: '8px' }}>
              ({totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Holdings Section */}
      <section style={{ marginTop: '32px' }}>
        <h2>Holdings</h2>
        {holdings.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '16px' }}>
            No holdings in this portfolio yet.
          </p>
        ) : (
          <div style={{ marginTop: '16px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Symbol</th>
                  <th style={{ padding: '12px' }}>Company</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Quantity</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Avg Cost</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Current Price</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Market Value</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Gain/Loss</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => {
                  const gainLoss = holding.total_gain_loss || 0;
                  const gainLossPercent = holding.gain_loss_percentage || 0;
                  
                  return (
                    <tr key={holding.holding_id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{holding.symbol}</td>
                      <td style={{ padding: '12px' }}>{holding.company_name}</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>{holding.quantity}</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        ${holding.average_cost.toFixed(2)}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        ${holding.current_price.toFixed(2)}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        ${(holding.market_value || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </td>
                      <td style={{ 
                        padding: '12px', 
                        textAlign: 'right',
                        color: gainLoss >= 0 ? '#15803d' : '#dc2626',
                        fontWeight: '500'
                      }}>
                        {gainLoss >= 0 ? '+' : ''}${Math.abs(gainLoss).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        <div style={{ fontSize: '12px' }}>
                          ({gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%)
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>Performance</h2>
        <StockChart />
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>Alerts</h2>
        <AlertList alerts={[]} />
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
          Alert functionality coming soon!
        </p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>Transactions</h2>
        <TransactionTable transactions={[]} />
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
          Transaction history coming soon!
        </p>
      </section>
    </div>
  );
}
