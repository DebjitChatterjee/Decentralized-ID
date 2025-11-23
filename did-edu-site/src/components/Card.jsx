import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, description, icon, delay = 0 }) => {
    return (
        <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                height: '100%'
            }}
        >
            <div style={{ color: 'var(--accent-primary)' }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', flex: 1 }}>{description}</p>
        </motion.div>
    );
};

export default Card;
