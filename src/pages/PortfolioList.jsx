import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioAPI } from '../services/api';

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded user ID for now - replace with actual auth later
  const userId = 1;

  useEffect(() => {
    async function fetchPortfolios() {
      try {
        setLoading(true);
        const data = await portfolioAPI.getByUser(userId);
        setPortfolios(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching portfolios:', err);
        setError('Failed to load portfolios. Make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolios();
  }, [userId]);

  if (loading) {
    return (
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px', textAlign: 'center' }}>
        <h2>Loading portfolios...</h2>
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
          border: '1px solid #fcc'
        }}>
          <h3 style={{ color: '#c00', margin: '0 0 8px 0' }}>Error</h3>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>
      <h1 style={{ textAlign: 'center' }}>My Portfolios</h1>
      
      {portfolios.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>
            You don't have any portfolios yet.
          </p>
          <p style={{ color: '#999' }}>Create your first portfolio to get started!</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
          marginTop: '24px'
        }}>
          {portfolios.map((p) => (
            <Link
              key={p.portfolio_id}
              to={`/portfolio/${p.portfolio_id}`}
              style={{
                display: 'block',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                textDecoration: 'none',
                color: '#111827',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
              }}
            >
              <h3 style={{ margin: 0 }}>{p.portfolio_name}</h3>
              {p.description && (
                <p style={{ 
                  margin: '8px 0 0', 
                  fontSize: '14px', 
                  color: '#6b7280',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {p.description}
                </p>
              )}
              <p style={{ margin: '12px 0 0', fontSize: '18px', fontWeight: 'bold' }}>
                ${(p.total_value || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6b7280' }}>
                Cash: ${(p.cash_balance || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
              <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#9ca3af' }}>
                Created: {new Date(p.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
