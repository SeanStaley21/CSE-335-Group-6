import React from 'react';

function PortfolioCard({ name, value, change }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>{name}</h2>
      <p>Total Value: ${value}</p>
      <p style={{ color: change >= 0 ? 'green' : 'red' }}>
        Change: {change}%
      </p>
    </div>
  );
}

export default PortfolioCard;
