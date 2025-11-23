import { motion } from 'framer-motion';
import { Shield, Lock, Users, Database, Eye, Key, FileCheck, Globe } from 'lucide-react';

const Guides = () => {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '1rem' }}
                >
                    The Future of Digital Identity
                </motion.h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
                    Why Decentralized Identifiers (DIDs) are replacing traditional SSOs and how they fundamentally secure the internet.
                </p>
            </header>

            {/* Section 1: DID vs SSO */}
            <section style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <Shield size={32} color="var(--accent-primary)" />
                    <h2 style={{ fontSize: '2rem', margin: 0 }}>The Paradigm Shift: DID vs. SSO</h2>
                </div>

                <div className="grid">
                    <motion.div
                        className="card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ borderLeft: '4px solid #f87171' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Database size={24} color="#f87171" />
                            <h3 style={{ margin: 0 }}>Traditional SSO (The Honeypot)</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Single Sign-On (Google, Facebook, Okta) relies on massive centralized databases. If the provider is hacked, millions of accounts are compromised instantly.
                        </p>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Single Point of Failure:</strong> One breach exposes everyone.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Privacy Loss:</strong> Providers track every login and service you use.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Censorship Risk:</strong> The provider can lock you out of your digital life.</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="card"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ borderLeft: '4px solid #4ade80' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Users size={24} color="#4ade80" />
                            <h3 style={{ margin: 0 }}>Decentralized Identity (DID)</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            You own your identity. Your "password" (private key) never leaves your device. Authentication happens via cryptographic proof, not by checking a database.
                        </p>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>No Central Database:</strong> Hackers have no "master list" to steal.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Privacy by Design:</strong> You choose what to share and with whom.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Portable:</strong> Take your reputation and credentials anywhere.</li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Section 2: Reducing Attack Surface */}
            <section style={{ marginBottom: '6rem', background: 'var(--bg-card)', padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Shrinking the Attack Surface</h2>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '60px', height: '60px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <Lock size={28} color="var(--accent-primary)" />
                        </div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Eliminating Passwords</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Phishing relies on stealing credentials. DIDs use cryptographic signatures that cannot be phished or replayed.
                        </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '60px', height: '60px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <Eye size={28} color="var(--accent-primary)" />
                        </div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Data Minimization</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Instead of sharing your full passport scan, share a "proof" that you are over 18. Less data shared = less data to leak.
                        </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '60px', height: '60px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <Globe size={28} color="var(--accent-primary)" />
                        </div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>No Correlation</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Use different DIDs for different services (Pairwise DIDs). Prevents trackers from building a complete profile of your life.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Future Trends */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <Key size={32} color="var(--accent-primary)" />
                    <h2 style={{ fontSize: '2rem', margin: 0 }}>The Horizon: What's Next?</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <motion.div
                        className="card"
                        whileHover={{ y: -5 }}
                        style={{ display: 'flex', gap: '2rem', alignItems: 'start' }}
                    >
                        <div style={{ padding: '1rem', background: '#252526', borderRadius: '12px' }}>
                            <FileCheck size={32} color="#a78bfa" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Zero-Knowledge Proofs (ZKPs)</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                The holy grail of privacy. Prove a statement is true without revealing the underlying data.
                                <br />
                                <em>Example:</em> Prove you earn &gt;$50k/year to a landlord without showing them your bank statements or exact salary.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="card"
                        whileHover={{ y: -5 }}
                        style={{ display: 'flex', gap: '2rem', alignItems: 'start' }}
                    >
                        <div style={{ padding: '1rem', background: '#252526', borderRadius: '12px' }}>
                            <Shield size={32} color="#f472b6" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Trust Registries & Governance</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                "Who is a valid issuer?" Digital Trust Frameworks (like eIDAS 2.0 in Europe) are defining the rules for who can issue high-value credentials (passports, degrees), bridging the gap between government authority and decentralized tech.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="card"
                        whileHover={{ y: -5 }}
                        style={{ display: 'flex', gap: '2rem', alignItems: 'start' }}
                    >
                        <div style={{ padding: '1rem', background: '#252526', borderRadius: '12px' }}>
                            <Users size={32} color="#60a5fa" />
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Reusable KYC</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                Onboard once, verify everywhere. Complete a rigorous KYC check with a bank, receive a "KYC Credential", and use that to instantly sign up for other services without re-uploading your ID documents.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Guides;
