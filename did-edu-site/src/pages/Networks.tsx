import { motion } from 'framer-motion';
import { Globe, Key, Server, Database, Check, X } from 'lucide-react';

const Networks = () => {
    const methods = [
        {
            name: 'did:web',
            icon: Globe,
            desc: 'Based on DNS domains. The DID document is hosted on a website.',
            pros: ['Extremely easy to deploy', 'No blockchain costs', 'Human-readable (domain)'],
            cons: ['Centralized (relies on DNS & server)', 'Less censorship resistant'],
            bestFor: 'Companies, Organizations, Official Issuers'
        },
        {
            name: 'did:key',
            icon: Key,
            desc: 'Purely cryptographic. The DID is derived from a public key.',
            pros: ['No registry needed', 'Instant & Free', 'Perfect for ephemeral use'],
            cons: ['Cannot rotate keys', 'No persistent profile', 'Long ugly identifiers'],
            bestFor: 'One-time interactions, IoT devices, Dev/Test'
        },
        {
            name: 'did:ethr',
            icon: Database,
            desc: 'Anchored on Ethereum (or L2s like Polygon).',
            pros: ['Decentralized', 'Secure', 'Interoperable with Web3 ecosystem'],
            cons: ['Gas fees (on mainnet)', 'Slower than web/key', 'Complex for non-crypto users'],
            bestFor: 'DeFi, Web3 Natives, High-value credentials'
        },
        {
            name: 'did:ion',
            icon: Server,
            desc: 'Runs on Sidetree protocol over Bitcoin.',
            pros: ['Maximum decentralization', 'Censorship resistant', 'Microsoft backed'],
            cons: ['Slow propagation', 'Complex infrastructure', 'Overkill for simple use cases'],
            bestFor: 'Global IDs, Government, High-security use cases'
        }
    ];

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '1rem' }}
                >
                    DID Methods & Networks
                </motion.h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                    Not all DIDs are created equal. The "Method" determines where the DID is stored and how it is resolved.
                    Choose the right one for your use case.
                </p>
            </header>

            <div className="grid" style={{ marginBottom: '4rem' }}>
                {methods.map((m, i) => (
                    <motion.div
                        key={m.name}
                        className="card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.8rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                                <m.icon size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{m.name}</h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '3rem' }}>
                            {m.desc}
                        </p>

                        <div style={{ marginBottom: '1rem' }}>
                            <strong style={{ color: '#4ade80', display: 'block', marginBottom: '0.5rem' }}>Pros:</strong>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {m.pros.map(p => (
                                    <li key={p} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                                        <Check size={16} color="#4ade80" /> {p}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <strong style={{ color: '#f87171', display: 'block', marginBottom: '0.5rem' }}>Cons:</strong>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {m.cons.map(c => (
                                    <li key={c} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                                        <X size={16} color="#f87171" /> {c}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Best For:</span>
                            <p style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{m.bestFor}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <section style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Comparison: Ease of Deployment</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ textAlign: 'left', padding: '1rem' }}>Method</th>
                                <th style={{ textAlign: 'left', padding: '1rem' }}>Setup Time</th>
                                <th style={{ textAlign: 'left', padding: '1rem' }}>Cost</th>
                                <th style={{ textAlign: 'left', padding: '1rem' }}>Technical Difficulty</th>
                                <th style={{ textAlign: 'left', padding: '1rem' }}>Decentralization</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>did:key</td>
                                <td style={{ padding: '1rem' }}>Instant</td>
                                <td style={{ padding: '1rem', color: '#4ade80' }}>Free</td>
                                <td style={{ padding: '1rem', color: '#4ade80' }}>Very Low</td>
                                <td style={{ padding: '1rem', color: '#facc15' }}>Medium</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>did:web</td>
                                <td style={{ padding: '1rem' }}>~10 mins</td>
                                <td style={{ padding: '1rem', color: '#4ade80' }}>Free (Hosting)</td>
                                <td style={{ padding: '1rem', color: '#4ade80' }}>Low</td>
                                <td style={{ padding: '1rem', color: '#f87171' }}>Low</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>did:ethr</td>
                                <td style={{ padding: '1rem' }}>~5 mins</td>
                                <td style={{ padding: '1rem', color: '#f87171' }}>Gas Fees</td>
                                <td style={{ padding: '1rem', color: '#facc15' }}>Medium</td>
                                <td style={{ padding: '1rem', color: '#4ade80' }}>High</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>did:ion</td>
                                <td style={{ padding: '1rem' }}>Hours</td>
                                <td style={{ padding: '1rem', color: '#4ade80' }}>Free (Batching)</td>
                                <td style={{ padding: '1rem', color: '#f87171' }}>High</td>
                                <td style={{ padding: '1rem', color: '#4ade80' }}>Very High</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Networks;
