import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import App from './App';
import Dashboard from './pages/Dashboard';
import PortfolioList from './pages/PortfolioList';
import Portfolio from './pages/Portfolio';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<PortfolioList />} />
          <Route path="/portfolio/:id" element={<Portfolio />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);