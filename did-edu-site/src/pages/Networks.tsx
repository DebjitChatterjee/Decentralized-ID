import { motion } from 'framer-motion';
import { Globe, Key, Server, Database, Check, X, Info, Box } from 'lucide-react';
import { useState } from 'react';

const Networks = () => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>('did:web');

    const methods = [
        {
            id: 'did:web',
            name: 'did:web',
            icon: Globe,
            shortDesc: 'Web Domain Based',
            fullDesc: 'Leverages existing DNS infrastructure. The DID document is hosted on a standard web server at a well-known URL.',
            technical: 'Resolves to https://<domain>/.well-known/did.json',
            pros: ['Zero blockchain costs', 'Human-readable identifiers', 'Easy to integrate with existing web apps'],
            cons: ['Relies on centralized DNS', 'Server uptime dependency', 'Less censorship resistant'],
            bestFor: 'Official Organizations, Corporate Issuers, Websites',
            stats: { cost: 'Free', speed: 'Instant', decentralization: 'Low' }
        },
        {
            id: 'did:key',
            name: 'did:key',
            icon: Key,
            shortDesc: 'Key Based (Ephemeral)',
            fullDesc: 'A self-certifying identifier derived directly from a cryptographic public key. No external registry or blockchain is required.',
            technical: 'did:key:<multibase_encoded_key>',
            pros: ['Offline creation', 'No network dependency', 'Cryptographically verifiable'],
            cons: ['Keys cannot be rotated', 'Identifier changes if key changes', 'Long, ugly strings'],
            bestFor: 'One-off interactions, IoT, Test environments',
            stats: { cost: 'Free', speed: 'Instant', decentralization: 'Max' }
        },
        {
            id: 'did:ethr',
            name: 'did:ethr',
            icon: Database,
            shortDesc: 'Ethereum Based',
            fullDesc: 'Anchored on the Ethereum blockchain (or L2s like Polygon). Uses smart contracts to manage DID documents and key rotation.',
            technical: 'ERC-1056 Lightweight Identity Registry',
            pros: ['Strong decentralization', 'Interoperable with Web3/DeFi', 'Secure key rotation'],
            cons: ['Gas fees for updates', 'Public ledger privacy concerns', 'Slower than web/key'],
            bestFor: 'DeFi Users, DAOs, High-value assets',
            stats: { cost: 'Gas', speed: 'Block time', decentralization: 'High' }
        },
        {
            id: 'did:ion',
            name: 'did:ion',
            icon: Server,
            shortDesc: 'Bitcoin (Sidetree)',
            fullDesc: 'Runs on the Sidetree protocol anchored to Bitcoin. Batches thousands of operations into a single transaction to reduce costs.',
            technical: 'Layer 2 on Bitcoin (IPFS + Anchor)',
            pros: ['Bitcoin-grade security', 'Censorship resistant', 'Microsoft backed'],
            cons: ['Slow propagation (hours)', 'Complex infrastructure', 'Overkill for simple apps'],
            bestFor: 'National IDs, High-security credentials',
            stats: { cost: 'Low', speed: 'Slow', decentralization: 'Max' }
        },
        {
            id: 'did:pkh',
            name: 'did:pkh',
            icon: Box,
            shortDesc: 'Public Key Hash',
            fullDesc: 'Wraps existing blockchain addresses (like an Ethereum or Solana address) into a DID. Great for "Sign in with Ethereum".',
            technical: 'Interoperability wrapper for CAIP-10',
            pros: ['Instant compatibility with wallets', 'No registration needed', 'Cross-chain standard'],
            cons: ['Limited functionality', 'Tied to specific chain address', 'Privacy leaks (wallet history)'],
            bestFor: 'dApps, Wallet Login, Cross-chain messaging',
            stats: { cost: 'Free', speed: 'Instant', decentralization: 'High' }
        }
    ];

    const selected = methods.find(m => m.id === selectedMethod);

    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '1200px' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>DID Methods Network</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                    Explore the landscape of Decentralized Identifier methods. From web-based simplicity to blockchain-anchored security.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', alignItems: 'start' }}>
                {/* Sidebar List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {methods.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setSelectedMethod(m.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: selectedMethod === m.id ? 'var(--bg-card)' : 'transparent',
                                border: selectedMethod === m.id ? '1px solid var(--accent-primary)' : '1px solid transparent',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{
                                padding: '0.5rem',
                                background: selectedMethod === m.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                                borderRadius: '8px',
                                color: selectedMethod === m.id ? 'white' : 'var(--text-secondary)'
                            }}>
                                <m.icon size={20} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{m.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.shortDesc}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Detail View */}
                <motion.div
                    key={selectedMethod}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: 'var(--bg-card)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2.5rem',
                        border: '1px solid var(--border-color)',
                        minHeight: '600px'
                    }}
                >
                    {selected && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '2rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {selected.name}
                                        <span style={{ fontSize: '0.9rem', padding: '0.2rem 0.8rem', borderRadius: '100px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                                            {selected.shortDesc}
                                        </span>
                                    </h2>
                                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                        {selected.fullDesc}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Setup Cost</div>
                                    <div style={{ fontWeight: '600', color: selected.stats.cost === 'Free' ? '#4ade80' : '#f87171' }}>{selected.stats.cost}</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Speed</div>
                                    <div style={{ fontWeight: '600' }}>{selected.stats.speed}</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Decentralization</div>
                                    <div style={{ fontWeight: '600', color: selected.stats.decentralization === 'Max' ? '#4ade80' : '#facc15' }}>{selected.stats.decentralization}</div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#1e1e20', borderRadius: 'var(--radius-md)', fontFamily: 'monospace', fontSize: '0.9rem', border: '1px solid var(--border-color)' }}>
                                <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Info size={14} /> Technical Implementation
                                </div>
                                <code style={{ color: '#a78bfa' }}>{selected.technical}</code>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Check size={18} color="#4ade80" /> Pros
                                    </h3>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {selected.pros.map(p => (
                                            <li key={p} style={{ marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.95rem', paddingLeft: '1rem', borderLeft: '2px solid #4ade80' }}>
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <X size={18} color="#f87171" /> Cons
                                    </h3>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {selected.cons.map(c => (
                                            <li key={c} style={{ marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.95rem', paddingLeft: '1rem', borderLeft: '2px solid #f87171' }}>
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Best For</span>
                                <p style={{ fontSize: '1.1rem', fontWeight: '500', marginTop: '0.5rem' }}>{selected.bestFor}</p>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Networks;
