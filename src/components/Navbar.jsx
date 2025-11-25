import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in on mount and route changes
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setUsername(null);
    navigate('/login');
  };

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
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {username ? (
          <>
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
            <span style={{ color: '#9ca3af', marginLeft: '8px' }}>
              {username}
            </span>
            <button
              onClick={handleLogout}
              style={{
                ...linkStyle,
                backgroundColor: '#dc2626',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 'inherit',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            style={({ isActive }) => ({
              ...linkStyle,
              backgroundColor: isActive ? '#374151' : 'transparent',
            })}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
