import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Concepts', path: '/concepts' },
    { name: 'Architecture', path: '/architecture' },
    { name: 'Guides', path: '/guides' },
    { name: 'Sandbox', path: '/sandbox' },
  ];

  return (
    <nav style={{
      borderBottom: '1px solid var(--border-color)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      backgroundColor: 'rgba(10, 10, 15, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <Shield size={32} color="var(--accent-primary)" />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>DID Edu</span>
        </Link>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: isActive(link.path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: isActive(link.path) ? '600' : '400',
                position: 'relative'
              }}
            >
              {link.name}
              {isActive(link.path) && (
                <span style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'var(--accent-primary)',
                  borderRadius: '2px'
                }} />
              )}
            </Link>
          ))}
        </div>

        <Link to="/sandbox" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          Try Demo
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
