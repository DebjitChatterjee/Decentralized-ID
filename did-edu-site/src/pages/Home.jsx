import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Key, FileCheck, Globe } from 'lucide-react';
import Card from '../components/Card';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section style={{
                padding: '8rem 0 6rem',
                textAlign: 'center',
                background: 'radial-gradient(circle at 50% 0%, rgba(100, 108, 255, 0.15), transparent 50%)'
            }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 style={{ maxWidth: '900px', margin: '0 auto 1.5rem' }}>
                            Own Your Digital Identity
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-secondary)',
                            maxWidth: '700px',
                            margin: '0 auto 3rem'
                        }}>
                            Decentralized Identifiers (DIDs) empower you to control your data, prove your identity, and interact securely without relying on centralized authorities.
                        </p>
                        <div className="flex-center" style={{ gap: '1.5rem' }}>
                            <Link to="/sandbox" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                                Start Experimenting
                            </Link>
                            <Link to="/concepts" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                                Learn the Basics
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem' }}>Why Decentralized Identity?</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            The shift from centralized control to user autonomy.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        <Card
                            title="Self-Sovereign"
                            description="You own your identifier. No government or corporation can take it away from you."
                            icon={<Shield size={40} />}
                            delay={0.1}
                        />
                        <Card
                            title="Cryptographic Proof"
                            description="Authenticate using public/private key pairs instead of passwords."
                            icon={<Key size={40} />}
                            delay={0.2}
                        />
                        <Card
                            title="Verifiable Credentials"
                            description="Share specific attributes (like age or degree) without revealing everything."
                            icon={<FileCheck size={40} />}
                            delay={0.3}
                        />
                        <Card
                            title="Interoperable"
                            description="Works across different platforms, blockchains, and systems using open standards."
                            icon={<Globe size={40} />}
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '6rem 0', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Ready to dive deeper?</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Explore the architecture behind DIDs or generate your own DID in our interactive sandbox.
                    </p>
                    <Link to="/architecture" className="btn btn-primary">
                        Explore Architecture
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
