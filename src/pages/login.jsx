import React from 'react';

export default function Login() {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit" style={{
          padding: '8px',
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '4px'
        }}>
          Login
        </button>
      </form>
    </div>
  );
}
