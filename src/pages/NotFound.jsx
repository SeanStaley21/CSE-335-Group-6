import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops, the page you’re looking for doesn’t exist.</p>
      <Link to="/" style={{ color: '#2563eb' }}>Back to Home</Link>
    </div>
  );
}

