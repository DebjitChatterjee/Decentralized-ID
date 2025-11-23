import React from 'react';
import InteractiveDiagram from '../components/InteractiveDiagram';

const Architecture = () => {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1>The Trust Triangle</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                    How Decentralized Identity enables trust without centralized intermediaries.
                </p>
            </header>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <p style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
                    The architecture of Self-Sovereign Identity (SSI) relies on three main roles: the <strong>Issuer</strong>, the <strong>Holder</strong>, and the <strong>Verifier</strong>.
                    They interact using DIDs and Verifiable Credentials, anchored by a Verifiable Data Registry (like a blockchain).
                </p>

                <InteractiveDiagram />

                <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="card">
                        <h3>Issuer</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            An entity (university, government, bank) that issues credentials to a Holder. They sign the credential with their private key.
                        </p>
                    </div>
                    <div className="card">
                        <h3>Holder</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            The user who receives and stores credentials in their wallet. They create proofs to present to Verifiers.
                        </p>
                    </div>
                    <div className="card">
                        <h3>Verifier</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            An entity that requests proof from a Holder. They verify the signature using the Issuer's public key from the DID Registry.
                        </p>
                    </div>
                    <div className="card">
                        <h3>DID Registry</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            A decentralized ledger or network where DIDs and their associated public keys (DID Documents) are stored.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Architecture;
