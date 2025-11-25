import { motion } from 'framer-motion';
import { Lock, Users, Database, Eye, Globe, ExternalLink, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Guides = () => {
    const [activeSection, setActiveSection] = useState('intro');

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    const sections = [
        { id: 'intro', title: 'Introduction' },
        { id: 'did-vs-sso', title: 'DID vs SSO' },
        { id: 'security', title: 'Security Benefits' },
        { id: 'market', title: 'Market Landscape' },
        { id: 'future', title: 'Future Trends' }
    ];

    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '1200px', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '4rem' }}>

            {/* Table of Contents */}
            <aside style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    Contents
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, borderLeft: '1px solid var(--border-color)' }}>
                    {sections.map(s => (
                        <li key={s.id}>
                            <button
                                onClick={() => scrollTo(s.id)}
                                style={{
                                    display: 'block',
                                    padding: '0.5rem 1rem',
                                    borderLeft: activeSection === s.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
                                    color: activeSection === s.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    marginLeft: '-1px',
                                    transition: 'all 0.2s',
                                    fontSize: '0.95rem'
                                }}
                            >
                                {s.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <main>
                <section id="intro" style={{ marginBottom: '6rem' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.1' }}
                    >
                        The Future of <br />
                        <span style={{ color: 'var(--accent-primary)' }}>Digital Identity</span>
                    </motion.h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                        Why Decentralized Identifiers (DIDs) are replacing traditional SSOs and how they fundamentally secure the internet.
                    </p>
                </section>

                <section id="did-vs-sso" style={{ marginBottom: '6rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>The Paradigm Shift: DID vs. SSO</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div style={{ background: 'rgba(248, 113, 113, 0.05)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(248, 113, 113, 0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <Database size={24} color="#f87171" />
                                <h3 style={{ margin: 0, color: '#f87171' }}>Traditional SSO</h3>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Single Sign-On (Google, Facebook) relies on massive centralized databases. A "Honeypot" for hackers.
                            </p>
                            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>Single Point of Failure</li>
                                <li style={{ marginBottom: '0.5rem' }}>Surveillance Capitalism</li>
                                <li style={{ marginBottom: '0.5rem' }}>Censorship Risk</li>
                            </ul>
                        </div>

                        <div style={{ background: 'rgba(74, 222, 128, 0.05)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(74, 222, 128, 0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <Users size={24} color="#4ade80" />
                                <h3 style={{ margin: 0, color: '#4ade80' }}>Decentralized Identity</h3>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                You own your identity. Authentication happens via cryptographic proof, locally on your device.
                            </p>
                            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>No Central Database</li>
                                <li style={{ marginBottom: '0.5rem' }}>Privacy by Design</li>
                                <li style={{ marginBottom: '0.5rem' }}>Portable Reputation</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="security" style={{ marginBottom: '6rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Shrinking the Attack Surface</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        {[
                            { icon: Lock, title: 'No Passwords', desc: 'Phishing is impossible without credentials to steal.' },
                            { icon: Eye, title: 'Data Minimization', desc: 'Share proofs (e.g. "Over 18"), not raw data.' },
                            { icon: Globe, title: 'No Correlation', desc: 'Prevent trackers from building a profile of your life.' }
                        ].map((item, i) => (
                            <div key={i} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                <item.icon size={24} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="market" style={{ marginBottom: '6rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Market Landscape</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Leading solutions and products driving the adoption of Decentralized Identity today.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            {
                                name: 'Microsoft Entra Verified ID',
                                desc: 'Enterprise-grade identity verification service based on open standards.',
                                tags: ['Enterprise', 'did:web', 'did:ion'],
                                link: 'https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-verified-id'
                            },
                            {
                                name: 'Privado ID (Polygon ID)',
                                desc: 'Identity infrastructure for Web3 with native Zero-Knowledge Proof support.',
                                tags: ['Web3', 'ZK-Proofs', 'did:iden3'],
                                link: 'https://www.privadoid.com/'
                            },
                            {
                                name: 'Dock.io',
                                desc: 'Full-stack platform for issuing and verifying fraud-proof credentials.',
                                tags: ['Platform', 'Verifiable Credentials', 'No-Code'],
                                link: 'https://www.dock.io/'
                            },
                            {
                                name: 'SpruceID',
                                desc: 'Open source tooling for user-controlled identity and data.',
                                tags: ['Open Source', 'Developer Tools', 'Sign-in with Ethereum'],
                                link: 'https://spruceid.com/'
                            }
                        ].map((product, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '2rem',
                                background: 'var(--bg-card)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-color)',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                                className="hover-card"
                                onClick={() => window.open(product.link, '_blank')}
                            >
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {product.name}
                                        <ExternalLink size={16} color="var(--text-secondary)" />
                                    </h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', maxWidth: '600px' }}>{product.desc}</p>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {product.tags.map(tag => (
                                            <span key={tag} style={{
                                                fontSize: '0.8rem',
                                                padding: '0.2rem 0.8rem',
                                                borderRadius: '100px',
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="future">
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>The Horizon</h2>
                    <div style={{ background: 'linear-gradient(145deg, #1e1e20, #111)', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#a78bfa' }}>Zero-Knowledge Proofs</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    Prove a statement is true without revealing the underlying data.
                                    Example: Prove you earn &gt;$50k/year to a landlord without showing them your bank statements.
                                </p>
                            </div>
                            <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f472b6' }}>Reusable KYC</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    Onboard once, verify everywhere. Complete a rigorous KYC check with a bank, receive a "KYC Credential",
                                    and use that to instantly sign up for other services.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Guides;
