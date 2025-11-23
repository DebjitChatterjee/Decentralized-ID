import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Search, FileCheck } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import { generateDID, resolveDID } from '../utils/didUtils';
import type { DIDGenerationResult, DIDDocument } from '../utils/didUtils';

const Sandbox = () => {
    // Generator State
    const [generatedData, setGeneratedData] = useState<DIDGenerationResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [didType, setDidType] = useState('key');

    // Resolver State
    const [resolveInput, setResolveInput] = useState('');
    const [resolveResult, setResolveResult] = useState<DIDDocument | null>(null);
    const [resolving, setResolving] = useState(false);
    const [resolveError, setResolveError] = useState<string | null>(null);

    // VC State
    const [vcSubject, setVcSubject] = useState('');
    const [vcData, setVcData] = useState<any | null>(null);
    const [issuing, setIssuing] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const data = await generateDID(didType);
            setGeneratedData(data);
            setResolveInput(data.did);
            setVcSubject(data.did); // Auto-fill VC subject
            setResolveResult(null);
        } catch (e: any) {
            console.error(e);
        }
        setLoading(false);
    };

    const handleResolve = async () => {
        if (!resolveInput) return;
        setResolving(true);
        setResolveError(null);
        try {
            const doc = await resolveDID(resolveInput);
            setResolveResult(doc);
        } catch (e: any) {
            setResolveError(e.message || "Failed to resolve DID");
        }
        setResolving(false);
    };

    const handleIssueVC = async () => {
        if (!vcSubject) return;
        setIssuing(true);
        // Simulate VC Issuance
        await new Promise(resolve => setTimeout(resolve, 1000));

        const vc = {
            "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "https://www.w3.org/2018/credentials/examples/v1"
            ],
            "id": "http://example.edu/credentials/1872",
            "type": ["VerifiableCredential", "AlumniCredential"],
            "issuer": "did:web:example.edu",
            "issuanceDate": new Date().toISOString(),
            "credentialSubject": {
                "id": vcSubject,
                "alumniOf": {
                    "id": "did:web:example.edu",
                    "name": "Example University"
                }
            },
            "proof": {
                "type": "Ed25519Signature2018",
                "created": new Date().toISOString(),
                "proofPurpose": "assertionMethod",
                "verificationMethod": "did:web:example.edu#keys-1",
                "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..."
            }
        };

        setVcData(vc);
        setIssuing(false);
    };

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1>DID Sandbox</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                    Generate DIDs, Resolve them, and Issue Verifiable Credentials.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>

                {/* Generator Section */}
                <div className="card">
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <RefreshCw size={24} color="var(--accent-primary)" />
                        1. Generate DID
                    </h2>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>DID Method</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                className={`btn ${didType === 'key' ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => setDidType('key')}
                            >
                                did:key
                            </button>
                            <button
                                className={`btn ${didType === 'web' ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => setDidType('web')}
                            >
                                did:web
                            </button>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', marginBottom: '1.5rem' }}
                        onClick={handleGenerate}
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Create New Identity'}
                    </button>

                    {generatedData && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                        >
                            <div style={{ marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Your New DID:</span>
                                <div style={{
                                    background: 'rgba(0,0,0,0.3)',
                                    padding: '0.8rem',
                                    borderRadius: 'var(--radius-sm)',
                                    fontFamily: 'monospace',
                                    wordBreak: 'break-all',
                                    border: '1px solid var(--accent-primary)',
                                    color: 'var(--accent-primary)'
                                }}>
                                    {generatedData.did}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Resolver Section */}
                <div className="card">
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Search size={24} color="var(--accent-secondary)" />
                        2. Resolve DID
                    </h2>

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <input
                            type="text"
                            placeholder="Paste a DID..."
                            value={resolveInput}
                            onChange={(e) => setResolveInput(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '0.8rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-primary)',
                                color: 'var(--text-primary)',
                                fontFamily: 'monospace'
                            }}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleResolve}
                            disabled={resolving}
                            style={{ background: 'var(--accent-secondary)' }}
                        >
                            Resolve
                        </button>
                    </div>

                    {resolveError && (
                        <div style={{ color: 'red', marginBottom: '1rem' }}>
                            {resolveError}
                        </div>
                    )}

                    {resolveResult && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <CodeBlock title="DID Document" code={JSON.stringify(resolveResult, null, 2)} />
                        </motion.div>
                    )}
                </div>

                {/* VC Issuance Section */}
                <div className="card" style={{ gridColumn: '1 / -1' }}>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileCheck size={24} color="#10b981" />
                        3. Issue Verifiable Credential
                    </h2>

                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Issue a sample "Alumni Credential" to the DID generated above.
                            </p>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Subject DID</label>
                                <input
                                    type="text"
                                    value={vcSubject}
                                    onChange={(e) => setVcSubject(e.target.value)}
                                    placeholder="did:key:..."
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-primary)',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'monospace'
                                    }}
                                />
                            </div>

                            <button
                                className="btn btn-primary"
                                onClick={handleIssueVC}
                                disabled={issuing}
                                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                            >
                                {issuing ? 'Issuing...' : 'Issue Credential'}
                            </button>
                        </div>

                        {vcData && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{ flex: 1, minWidth: '300px' }}
                            >
                                <CodeBlock title="Verifiable Credential (JSON-LD)" code={JSON.stringify(vcData, null, 2)} />
                            </motion.div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Sandbox;
