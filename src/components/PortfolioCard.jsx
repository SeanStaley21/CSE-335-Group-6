import React from 'react';

function PortfolioCard({ name, value, change }) {
  return (
    <div style={{
      border: '2px solid var(--border-color)',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '12px',
      backgroundColor: 'var(--bg-card)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>{name}</h2>
      <p style={{ margin: '8px 0', fontSize: '18px', color: 'var(--text-primary)' }}>
        Total Value: <strong>${value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
      </p>
      <p style={{ 
        margin: '8px 0',
        color: change >= 0 ? '#15803d' : '#dc2626',
        fontWeight: '600',
        fontSize: '16px'
      }}>
        Change: {change >= 0 ? '+' : ''}{change}%
      </p>
    </div>
  );
}

export default PortfolioCard;
