import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    transition: 'background 0.3s',
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: '#1f2937',
        color: '#fff',
      }}
    >
      <h2 style={{ margin: 0 }}>Portfolio Manager</h2>
      <div style={{ display: 'flex', gap: '16px' }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            ...linkStyle,
            backgroundColor: isActive ? '#374151' : 'transparent',
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            ...linkStyle,
            backgroundColor: isActive ? '#374151' : 'transparent',
          })}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/portfolio"
          style={({ isActive }) => ({
            ...linkStyle,
            backgroundColor: isActive ? '#374151' : 'transparent',
          })}
        >
          Portfolios
        </NavLink>
        <NavLink
          to="/login"
          style={({ isActive }) => ({
            ...linkStyle,
            backgroundColor: isActive ? '#374151' : 'transparent',
          })}
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
