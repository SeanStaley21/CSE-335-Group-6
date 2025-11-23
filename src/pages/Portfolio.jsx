import React from 'react';
import { useParams, Link } from 'react-router-dom';
import StockChart from '../components/StockChart';
import AlertList from '../components/AlertList';
import TransactionTable from '../components/TransactionTable';

const portfolios = {
  tech: {
    name: 'Tech Growth',
    holdings: [
      { symbol: 'AAPL', shares: 20 },
      { symbol: 'MSFT', shares: 15 },
      { symbol: 'NVDA', shares: 8 },
    ],
    alerts: [
      { symbol: 'AAPL', condition: '>', threshold: 150 },
      { symbol: 'NVDA', condition: '<', threshold: 450 },
    ],
    transactions: [
      { date: '2025-10-29', symbol: 'AAPL', type: 'Buy', amount: 10 },
      { date: '2025-11-03', symbol: 'MSFT', type: 'Buy', amount: 5 },
    ],
  },
  div: {
    name: 'Dividends',
    holdings: [
      { symbol: 'T', shares: 100 },
      { symbol: 'KO', shares: 40 },
    ],
    alerts: [{ symbol: 'KO', condition: '>', threshold: 65 }],
    transactions: [{ date: '2025-11-02', symbol: 'KO', type: 'Buy', amount: 10 }],
  },
  index: {
    name: 'Index Fund',
    holdings: [{ symbol: 'VOO', shares: 12 }],
    alerts: [],
    transactions: [{ date: '2025-10-15', symbol: 'VOO', type: 'Buy', amount: 12 }],
  },
};

export default function Portfolio() {
  const { id } = useParams();
  const data = portfolios[id];

  if (!data) {
    return (
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>
        <h1 style={{ textAlign: 'center' }}>Portfolio not found</h1>
        <p>The portfolio “{id}” doesn’t exist.</p>
        <Link to="/portfolio" style={{ color: '#2563eb' }}>Back to portfolios</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>
      <Link to="/portfolio" style={{ color: '#2563eb' }}>← Back to portfolios</Link>
      <h1 style={{ textAlign: 'center', marginTop: '8px' }}>{data.name}</h1>

      <section style={{ marginTop: '24px' }}>
        <h2>Holdings</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '12px'
        }}>
          {data.holdings.map((h) => (
            <div key={h.symbol} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              padding: '12px'
            }}>
              <strong>{h.symbol}</strong>
              <div>Shares: {h.shares}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>Performance</h2>
        <StockChart />
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>Alerts</h2>
        <AlertList alerts={data.alerts} />
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>Transactions</h2>
        <TransactionTable transactions={data.transactions} />
      </section>
    </div>
  );
}
