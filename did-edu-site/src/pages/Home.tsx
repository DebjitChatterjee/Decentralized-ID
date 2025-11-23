import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Key, FileCheck, Globe } from 'lucide-react';
import Card from '../components/Card';

const Home = () => {
    return (
        <div className="container">
            {/* Hero Section */}
            <section style={{
                textAlign: 'center',
                padding: '6rem 0',
                background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)'
            }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}
                >
                    Own Your Digital Identity
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem' }}
                >
                    Learn how Decentralized Identifiers (DIDs) empower you to control your data, prove who you are, and interact securely without intermediaries.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
                >
                    <Link to="/concepts" className="btn btn-primary">Start Learning</Link>
                    <Link to="/sandbox" className="btn btn-outline">Try Sandbox</Link>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '4rem 0' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Why Decentralized Identity?</h2>
                <div className="grid">
                    <Card
                        title="Self-Sovereign"
                        description="You own your identifier. No government or corporation can take it away from you."
                        icon={Shield}
                        delay={0.1}
                    />
                    <Card
                        title="Cryptographic Proof"
                        description="Use private keys to sign data and prove ownership without revealing secrets."
                        icon={Key}
                        delay={0.2}
                    />
                    <Card
                        title="Verifiable Credentials"
                        description="Digitize physical credentials like degrees and licenses in a tamper-proof way."
                        icon={FileCheck}
                        delay={0.3}
                    />
                    <Card
                        title="Interoperable"
                        description="Works across different blockchains, networks, and platforms using open standards."
                        icon={Globe}
                        delay={0.4}
                    />
                </div>
            </section>
        </div>
    );
};

export default Home;
