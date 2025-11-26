import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    if (userId) {
      // If logged in, redirect to dashboard
      navigate('/dashboard');
    } else {
      // If not logged in, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <h2>Redirecting...</h2>
    </div>
  );
}
