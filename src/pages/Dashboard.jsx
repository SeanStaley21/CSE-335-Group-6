import React, { useState, useEffect } from 'react';
import PortfolioCard from '../components/PortfolioCard';
import StockChart from '../components/StockChart';
import AlertList from '../components/AlertList';
import TransactionTable from '../components/TransactionTable';
import { userAPI, portfolioAPI } from '../services/api';

const dummyAlerts = [
  { symbol: 'AAPL', condition: '>', threshold: 150 },
  { symbol: 'TSLA', condition: '<', threshold: 200 }
];

const dummyTransactions = [
  { date: '2025-11-01', symbol: 'AAPL', type: 'Buy', amount: 10 },
  { date: '2025-11-03', symbol: 'TSLA', type: 'Sell', amount: 5 }
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded user ID for now - replace with actual auth later
  const userId = 1;

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        
        // Fetch user info, portfolios, and dashboard stats in parallel
        const [userData, portfoliosData, statsData] = await Promise.all([
          userAPI.getById(userId),
          portfolioAPI.getByUser(userId),
          userAPI.getDashboard(userId)
        ]);

        setUser(userData);
        setPortfolios(portfoliosData);
        setDashboardStats(statsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [userId]);

  if (loading) {
    return (
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px', textAlign: 'center' }}>
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>
        <div style={{ 
          backgroundColor: '#fee', 
          padding: '16px', 
          borderRadius: '8px', 
          border: '1px solid #fcc',
          marginBottom: '24px'
        }}>
          <h3 style={{ color: '#c00', margin: '0 0 8px 0' }}>Error</h3>
          <p style={{ margin: 0 }}>{error}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
            Make sure to:
            <br />1. Run the SQL script to create the database
            <br />2. Update server/.env with your database credentials
            <br />3. Start the backend server: cd server && npm install && npm run dev
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>
      <h1 style={{ textAlign: 'center' }}>
        Dashboard - Welcome {user?.first_name} {user?.last_name}!
      </h1>

      {/* Dashboard Stats Summary */}
      {dashboardStats && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px',
          marginTop: '24px'
        }}>
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#f0f9ff', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#0369a1' }}>Total Portfolios</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
              {dashboardStats.total_portfolios || 0}
            </p>
          </div>
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#f0fdf4', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#15803d' }}>Total Value</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
              ${(dashboardStats.total_portfolio_value || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </p>
          </div>
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#fef3c7', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#a16207' }}>Cash Balance</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
              ${(dashboardStats.total_cash || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </p>
          </div>
        </div>
      )}

      {/* Portfolio Cards */}
      <section style={{ marginTop: '24px' }}>
        <h2>Your Portfolios</h2>
        {portfolios.length > 0 ? (
          <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
            {portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.portfolio_id}
                name={portfolio.portfolio_name}
                value={portfolio.total_value}
                change={0} // Calculate change from historical data later
              />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#666', marginTop: '16px' }}>
            No portfolios yet. Create your first portfolio to get started!
          </p>
        )}
      </section>

      <section style={{ marginTop: '24px' }}>
        <StockChart />
      </section>

      <section style={{ marginTop: '24px' }}>
        <AlertList alerts={dummyAlerts} />
      </section>

      <section style={{ marginTop: '24px' }}>
        <TransactionTable transactions={dummyTransactions} />
      </section>
    </div>
  );
}
