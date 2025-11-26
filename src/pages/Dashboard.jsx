import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioCard from '../components/PortfolioCard';
import StockChart from '../components/StockChart';
import AlertList from '../components/AlertList';
import TransactionTable from '../components/TransactionTable';
import { userAPI, portfolioAPI } from '../services/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }
    async function fetchDashboardData(userId) {
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

    fetchDashboardData(userId);
  }, [navigate]);

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
          backgroundColor: 'rgba(255, 255, 255, 1)', 
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

  // Calculate total portfolio value for summary
  const totalValue = parseFloat(dashboardStats?.total_portfolio_value) || 0;
  const totalCash = parseFloat(dashboardStats?.total_cash) || 0;
  const grandTotal = totalValue + totalCash;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Welcome Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          margin: '0 0 8px 0',
          fontSize: '32px',
          color: 'var(--text-primary)'
        }}>
          Welcome back, {user?.first_name}!
        </h1>
        <p style={{ 
          margin: 0,
          fontSize: '16px',
          color: 'var(--text-secondary)'
        }}>
          Here's an overview of your investments
        </p>
      </div>

      {/* Main Stats Summary - Simplified */}
      {dashboardStats && (
        <div style={{
          padding: '32px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '16px',
          border: '2px solid var(--border-color)',
          marginBottom: '32px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '32px'
          }}>
            <div>
              <div style={{ 
                fontSize: '14px', 
                color: 'var(--text-secondary)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: '600'
              }}>
                Total Value
              </div>
              <div style={{ 
                fontSize: '36px', 
                fontWeight: 'bold',
                color: '#10b981',
                letterSpacing: '0.5px'
              }}>
                ${grandTotal.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}
              </div>
            </div>
            
            <div>
              <div style={{ 
                fontSize: '14px', 
                color: 'var(--text-secondary)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: '600'
              }}>
                Portfolios
              </div>
              <div style={{ 
                fontSize: '36px', 
                fontWeight: 'bold',
                color: 'var(--text-primary)'
              }}>
                {dashboardStats.total_portfolios || 0}
              </div>
            </div>
            
            <div>
              <div style={{ 
                fontSize: '14px', 
                color: 'var(--text-secondary)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: '600'
              }}>
                Available Cash
              </div>
              <div style={{ 
                fontSize: '36px', 
                fontWeight: 'bold',
                color: '#3b82f6',
                letterSpacing: '0.5px'
              }}>
                ${totalCash.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Portfolio List - Compact */}
        <div style={{
          padding: '24px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <h2 style={{ 
            margin: '0 0 20px 0',
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--text-primary)'
          }}>
            Your Portfolios ({portfolios.length})
          </h2>
          
          {portfolios.length > 0 ? (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px',
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {portfolios
                .sort((a, b) => parseFloat(b.cash_balance || 0) - parseFloat(a.cash_balance || 0))
                .slice(0, 8)
                .map((portfolio) => (
                <div
                  key={portfolio.portfolio_id}
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => navigate(`/portfolio/${portfolio.portfolio_id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.borderColor = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <div>
                    <div style={{ 
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '4px'
                    }}>
                      {portfolio.portfolio_name}
                    </div>
                    <div style={{ 
                      fontSize: '12px',
                      color: 'var(--text-secondary)'
                    }}>
                      Cash: ${parseFloat(portfolio.cash_balance || 0).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '20px',
                    color: 'var(--text-secondary)'
                  }}>
                    →
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ 
              textAlign: 'center', 
              color: 'var(--text-secondary)',
              padding: '40px 20px'
            }}>
              No portfolios yet. Create your first portfolio to get started!
            </p>
          )}
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ 
              margin: '0 0 16px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              Active Alerts
            </h3>
            <AlertList alerts={[]} />
            <p style={{ 
              fontSize: '14px', 
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginTop: '12px'
            }}>
              Alert functionality coming soon!
            </p>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ 
              margin: '0 0 16px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              Recent Activity
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: 'var(--text-secondary)',
              textAlign: 'center',
              padding: '20px'
            }}>
              Transaction history coming soon!
            </p>
          </div>
        </div>
      </div>

      {/* Stock Chart */}
      <StockChart />
    </div>
  );
}
