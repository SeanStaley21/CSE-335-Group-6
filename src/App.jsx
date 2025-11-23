import React from 'react';
import PortfolioCard from './components/PortfolioCard';

const portfolios = [
  { name: 'Tech Stocks', value: 12500, change: 2.5 },
  { name: 'Energy Holdings', value: 8300, change: -1.2 },
  { name: 'Index Fund', value: 15420, change: 1.2 },
];

export default function App() {
  return (
    <div style={{ padding: '24px' }}>
      <h1>My Portfolios</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {portfolios.map((p, i) => (
          <PortfolioCard key={i} name={p.name} value={p.value} change={p.change} />
        ))}
      </div>
    </div>
  );
}
