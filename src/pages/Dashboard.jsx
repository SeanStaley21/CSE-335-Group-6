import React from 'react';
import PortfolioCard from '../components/PortfolioCard';
import StockChart from '../components/StockChart';
import AlertList from '../components/AlertList';
import TransactionTable from '../components/TransactionTable';

const dummyAlerts = [
  { symbol: 'AAPL', condition: '>', threshold: 150 },
  { symbol: 'TSLA', condition: '<', threshold: 200 }
];

const dummyTransactions = [
  { date: '2025-11-01', symbol: 'AAPL', type: 'Buy', amount: 10 },
  { date: '2025-11-03', symbol: 'TSLA', type: 'Sell', amount: 5 }
];

export default function Dashboard() {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>
      <h1 style={{ textAlign: 'center' }}>Dashboard</h1>

      <section style={{ marginTop: '24px' }}>
        <PortfolioCard name="Tech Stocks" value={12500} change={2.5} />
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
