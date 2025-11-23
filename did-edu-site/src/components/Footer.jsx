import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid var(--border-color)',
            padding: '3rem 0',
            marginTop: '4rem',
            backgroundColor: 'var(--bg-secondary)'
        }}>
            <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                <p>&copy; {new Date().getFullYear()} Decentralized Identity Education. Built for the Future.</p>
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    <a href="#" style={{ color: 'var(--text-secondary)' }}>GitHub</a>
                    <a href="#" style={{ color: 'var(--text-secondary)' }}>Documentation</a>
                    <a href="#" style={{ color: 'var(--text-secondary)' }}>W3C Spec</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
