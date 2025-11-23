import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        style={{ marginBottom: '4rem' }}
    >
        <h2 style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>{title}</h2>
        <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            {children}
        </div>
    </motion.div>
);

const Concepts = () => {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1>Core Concepts</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                    Understanding the building blocks of Decentralized Identity.
                </p>
            </header>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Section title="What is a DID?">
                    <p>
                        A <strong>Decentralized Identifier (DID)</strong> is a new type of identifier that enables verifiable, decentralized digital identity.
                        Unlike typical identifiers (like email addresses or usernames), DIDs are designed to be decoupled from centralized registries, identity providers, and certificate authorities.
                    </p>
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-md)',
                        marginTop: '1.5rem',
                        borderLeft: '4px solid var(--accent-primary)'
                    }}>
                        <code>did:example:123456789abcdefghi</code>
                    </div>
                    <p style={{ marginTop: '1rem' }}>
                        A DID is a simple text string consisting of three parts:
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>The URI scheme identifier (<code>did</code>)</li>
                            <li>The identifier for the DID method (e.g., <code>key</code>, <code>web</code>, <code>ethr</code>)</li>
                            <li>The DID method-specific identifier</li>
                        </ul>
                    </p>
                </Section>

                <Section title="Verifiable Credentials (VCs)" delay={0.1}>
                    <p>
                        <strong>Verifiable Credentials</strong> are the digital equivalent of physical credentials (like a driver's license or university degree).
                        They are cryptographically signed by an Issuer and can be verified by a Verifier without contacting the Issuer directly.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                        <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                            <h4 style={{ color: 'var(--text-primary)' }}>Physical Credential</h4>
                            <p style={{ fontSize: '0.9rem' }}>Plastic card, paper document. Hard to verify instantly. Easy to forge.</p>
                        </div>
                        <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                            <h4 style={{ color: 'var(--text-primary)' }}>Verifiable Credential</h4>
                            <p style={{ fontSize: '0.9rem' }}>JSON-LD format. Instantly verifiable. Cryptographically secure.</p>
                        </div>
                    </div>
                </Section>

                <Section title="DID vs. Conventional Identity" delay={0.2}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-primary)' }}>Feature</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-primary)' }}>Centralized (Web2)</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--accent-primary)' }}>Decentralized (Web3)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem' }}>Control</td>
                                <td style={{ padding: '1rem' }}>Service Provider (Google, FB)</td>
                                <td style={{ padding: '1rem' }}>User (Self-Sovereign)</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem' }}>Portability</td>
                                <td style={{ padding: '1rem' }}>Low (Siloed)</td>
                                <td style={{ padding: '1rem' }}>High (Universal)</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem' }}>Security</td>
                                <td style={{ padding: '1rem' }}>Honeypot for hackers</td>
                                <td style={{ padding: '1rem' }}>Distributed, User-held keys</td>
                            </tr>
                        </tbody>
                    </table>
                </Section>
            </div>
        </div>
    );
};

export default Concepts;
