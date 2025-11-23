import React from 'react';
import { Link } from 'react-router-dom';

const portfolios = [
  { id: 'tech', name: 'Tech Growth', value: 15200, change: 2.1 },
  { id: 'div', name: 'Dividends', value: 8300, change: -1.2 },
  { id: 'index', name: 'Index Fund', value: 14200, change: 1.2 },
];

export default function PortfolioList() {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>
      <h1 style={{ textAlign: 'center' }}>My Portfolios</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '16px',
        marginTop: '24px'
      }}>
        {portfolios.map((p) => (
          <Link
            key={p.id}
            to={`/portfolio/${p.id}`}
            style={{
              display: 'block',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '16px',
              textDecoration: 'none',
              color: '#111827',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <h3 style={{ margin: 0 }}>{p.name}</h3>
            <p style={{ margin: '8px 0 0' }}>Value: ${p.value.toLocaleString()}</p>
            <p style={{ margin: '4px 0', color: p.change >= 0 ? '#16a34a' : '#dc2626' }}>
              {p.change >= 0 ? '+' : ''}
              {p.change}% today
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
