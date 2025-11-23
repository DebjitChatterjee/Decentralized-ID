import React from 'react';

const CodeBlock = ({ code, language = 'json', title }) => {
    return (
        <div style={{
            background: '#1e1e1e',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid #333',
            margin: '1rem 0'
        }}>
            {title && (
                <div style={{
                    padding: '0.5rem 1rem',
                    background: '#252526',
                    borderBottom: '1px solid #333',
                    fontSize: '0.8rem',
                    color: '#ccc',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span>{title}</span>
                    <span style={{ textTransform: 'uppercase', opacity: 0.6 }}>{language}</span>
                </div>
            )}
            <pre style={{
                padding: '1rem',
                margin: 0,
                overflowX: 'auto',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                color: '#d4d4d4'
            }}>
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeBlock;
