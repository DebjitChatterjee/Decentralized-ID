import { motion } from 'framer-motion';
import { Shield, Database, Globe, Lock, Share2, Server, Key } from 'lucide-react';

const Section = ({ title, children, delay = 0 }: { title: string, children: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        style={{ marginBottom: '6rem' }}
    >
        <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '600', 
            marginBottom: '2rem',
            background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
        }}>
            {title}
        </h2>
        <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            {children}
        </div>
    </motion.div>
);

const Card = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <div style={{ 
        background: 'var(--bg-card)', 
        padding: '2rem', 
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        height: '100%'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ 
                padding: '0.75rem', 
                background: 'rgba(99, 102, 241, 0.1)', 
                borderRadius: '12px', 
                color: 'var(--accent-primary)' 
            }}>
                <Icon size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
            {children}
        </div>
    </div>
);

const Concepts = () => {
    return (
        <div className="container" style={{ padding: '6rem 0', maxWidth: '900px' }}>
            <header style={{ textAlign: 'center', marginBottom: '8rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <span style={{ 
                        display: 'inline-block', 
                        padding: '0.5rem 1rem', 
                        borderRadius: '100px', 
                        background: 'rgba(99, 102, 241, 0.1)', 
                        color: 'var(--accent-primary)',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: '1.5rem'
                    }}>
                        FUNDAMENTALS
                    </span>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        Core Concepts
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                        A comprehensive guide to the building blocks of the decentralized identity ecosystem.
                    </p>
                </motion.div>
            </header>

            <Section title="What is a DID?">
                <p style={{ marginBottom: '2rem' }}>
                    A <strong>Decentralized Identifier (DID)</strong> is a globally unique identifier that does not require a centralized registration authority. 
                    Unlike a username or email address, which is rented from a service provider (like Google or Twitter), a DID is owned and controlled entirely by the user.
                </p>
                
                <div style={{ 
                    background: '#1e1e20', 
                    padding: '2rem', 
                    borderRadius: 'var(--radius-md)', 
                    fontFamily: 'monospace',
                    marginBottom: '2rem',
                    border: '1px solid var(--border-color)'
                }}>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>// Anatomy of a DID</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '1.1rem' }}>
                        <span style={{ color: '#a78bfa' }}>did</span>
                        <span style={{ color: 'var(--text-secondary)' }}>:</span>
                        <span style={{ color: '#f472b6' }}>method</span>
                        <span style={{ color: 'var(--text-secondary)' }}>:</span>
                        <span style={{ color: '#60a5fa' }}>unique-identifier-string</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <Card title="Scheme" icon={Globe}>
                        The URI scheme identifier. Always <code>did</code>. This tells applications that they are interacting with a decentralized identifier.
                    </Card>
                    <Card title="Method" icon={Server}>
                        Defines how the DID is created, resolved, and managed. Examples: <code>ethr</code> (Ethereum), <code>web</code> (Web Domain), <code>key</code> (Public Key).
                    </Card>
                    <Card title="Identifier" icon={Key}>
                        A method-specific string that identifies the DID. This is often a cryptographic public key or a hash.
                    </Card>
                </div>
            </Section>

            <Section title="The DID Document">
                <p style={{ marginBottom: '2rem' }}>
                    If a DID is the "address", the <strong>DID Document</strong> is the "house". It is a JSON-LD object that contains the information needed to interact with the DID subject.
                    Resolving a DID involves fetching this document.
                </p>
                <div style={{ 
                    background: '#1e1e20', 
                    padding: '2rem', 
                    borderRadius: 'var(--radius-md)', 
                    fontSize: '0.9rem',
                    overflowX: 'auto',
                    border: '1px solid var(--border-color)'
                }}>
                    <pre style={{ margin: 0, color: '#d4d4d8' }}>
{`{
  "id": "did:example:123456789abcdefghi",
  "verificationMethod": [{
    "id": "did:example:123456789abcdefghi#keys-1",
    "type": "Ed25519VerificationKey2020",
    "controller": "did:example:123456789abcdefghi",
    "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
  }],
  "service": [{
    "id": "did:example:123456789abcdefghi#vcs",
    "type": "VerifiableCredentialService",
    "serviceEndpoint": "https://example.com/vc/"
  }]
}`}
                    </pre>
                </div>
            </Section>

            <Section title="Verifiable Credentials (VCs)">
                <p style={{ marginBottom: '3rem' }}>
                    Verifiable Credentials are the standard data model for digital credentials. They enable the <strong>Trust Triangle</strong>, a model where trust is transitive and cryptographic.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'inline-flex', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', borderRadius: '50%', color: '#4ade80' }}>
                            <Database size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Issuer</h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                            Signs the credential with their private key. (e.g., University, Government, Bank)
                        </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'inline-flex', padding: '1rem', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '50%', color: '#60a5fa' }}>
                            <Shield size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Holder</h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                            Stores the credential in their digital wallet and presents it when needed. (e.g., You)
                        </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'inline-flex', padding: '1rem', background: 'rgba(248, 113, 113, 0.1)', borderRadius: '50%', color: '#f87171' }}>
                            <Lock size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Verifier</h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                            Checks the signature against the Issuer's DID on the blockchain/web. (e.g., Employer, Hotel)
                        </p>
                    </div>
                </div>
            </Section>

            <Section title="DID vs. Traditional Identity">
                <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-card)' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                                <th style={{ textAlign: 'left', padding: '1.5rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}>Feature</th>
                                <th style={{ textAlign: 'left', padding: '1.5rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}>Centralized (Web2)</th>
                                <th style={{ textAlign: 'left', padding: '1.5rem', color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-color)' }}>Decentralized (Web3)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { feature: 'Ownership', web2: 'Service Provider', web3: 'User' },
                                { feature: 'Data Storage', web2: 'Centralized Servers', web3: 'User Wallet / Edge' },
                                { feature: 'Portability', web2: 'Siloed (Locked in)', web3: 'Universal (Interoperable)' },
                                { feature: 'Security', web2: 'Password based', web3: 'Cryptography based' },
                                { feature: 'Privacy', web2: 'Surveillance / Tracking', web3: 'Selective Disclosure' },
                            ].map((row, i) => (
                                <tr key={i} style={{ borderBottom: i !== 4 ? '1px solid var(--border-color)' : 'none' }}>
                                    <td style={{ padding: '1.5rem', fontWeight: '500' }}>{row.feature}</td>
                                    <td style={{ padding: '1.5rem', color: 'var(--text-secondary)' }}>{row.web2}</td>
                                    <td style={{ padding: '1.5rem', color: 'var(--text-primary)' }}>{row.web3}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="The Identity Trilemma">
                <p style={{ marginBottom: '2rem' }}>
                    Just like the Blockchain Trilemma, decentralized identity systems often have to balance three competing objectives.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <Card title="Security" icon={Shield}>
                        The system must be resistant to tampering and identity theft. Keys must be secure.
                    </Card>
                    <Card title="Decentralization" icon={Share2}>
                        No single entity should control the network or the ability to issue/verify IDs.
                    </Card>
                    <Card title="Scalability" icon={Database}>
                        The system must handle millions of users and interactions without high costs or latency.
                    </Card>
                </div>
            </Section>
        </div>
    );
};

export default Concepts;
