import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Building, CheckCircle, ArrowRight, Lock, FileCheck } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import { generateDID, issueCredential, verifyCredential } from '../utils/didUtils';
import type { DIDGenerationResult, VerifiableCredential } from '../utils/didUtils';

const Sandbox = () => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // Step 1: Org Setup
    const [domain, setDomain] = useState('example.com');
    const [orgDidData, setOrgDidData] = useState<DIDGenerationResult | null>(null);

    // Step 2: Employee Details
    const [employeeName, setEmployeeName] = useState('Alice Smith');
    const [employeeRole, setEmployeeRole] = useState('Senior Engineer');
    const [employeeDidData, setEmployeeDidData] = useState<DIDGenerationResult | null>(null);
    const [credential, setCredential] = useState<VerifiableCredential | null>(null);

    // Step 4: Verification
    const [verificationResult, setVerificationResult] = useState<'success' | 'failure' | null>(null);

    const handleCreateOrg = async () => {
        setLoading(true);
        try {
            const result = await generateDID('web', domain);
            setOrgDidData(result);
            setTimeout(() => {
                setLoading(false);
                setStep(1);
            }, 1000);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    const handleIssueCredential = async () => {
        setLoading(true);
        try {
            // 1. Create a DID for the employee (usually did:key for users)
            const empDid = await generateDID('key');
            setEmployeeDidData(empDid);

            // 2. Issue VC
            if (orgDidData) {
                const vc = await issueCredential(orgDidData.did, empDid.did, {
                    name: employeeName,
                    role: employeeRole,
                    department: 'Engineering'
                });
                setCredential(vc);
                setTimeout(() => {
                    setLoading(false);
                    setStep(2);
                }, 1500);
            }
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        setLoading(true);
        if (credential) {
            const isValid = await verifyCredential(credential);
            setTimeout(() => {
                setVerificationResult(isValid ? 'success' : 'failure');
                setLoading(false);
            }, 2000);
        }
    };

    const steps = [
        { title: 'Organization Setup', icon: Building },
        { title: 'Issue Credential', icon: FileCheck },
        { title: 'User Wallet', icon: User },
        { title: 'Verification', icon: Shield }
    ];

    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '1000px' }}>
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1>DID Sandbox</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                    Simulate a real-world `did:web` flow: Issue an Employee ID and use it to login.
                </p>
            </header>

            {/* Stepper */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '24px', left: 0, right: 0, height: '2px', background: '#333', zIndex: 0 }} />
                {steps.map((s, i) => (
                    <div key={i} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: i <= step ? 'var(--accent-primary)' : '#252526',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            border: i === step ? '4px solid rgba(99, 102, 241, 0.3)' : 'none'
                        }}>
                            <s.icon size={24} color={i <= step ? 'white' : '#666'} />
                        </div>
                        <span style={{ fontSize: '0.9rem', color: i <= step ? 'var(--text-primary)' : '#666', fontWeight: i === step ? 'bold' : 'normal' }}>{s.title}</span>
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px' }}>
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 style={{ marginBottom: '1.5rem' }}>1. Create Organization DID</h2>
                            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                                Companies usually use <code>did:web</code> because it links their identity to their domain name.
                            </p>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Organization Domain</label>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <input
                                        type="text"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                        style={{
                                            flex: 1,
                                            padding: '0.8rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-primary)',
                                            color: 'white'
                                        }}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleCreateOrg}
                                        disabled={loading}
                                    >
                                        {loading ? 'Generating...' : 'Create DID'}
                                    </button>
                                </div>
                            </div>

                            {orgDidData && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div style={{ padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                                        <p style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <CheckCircle size={20} /> DID Created Successfully!
                                        </p>
                                    </div>
                                    <CodeBlock title="DID Document (hosted at /.well-known/did.json)" code={JSON.stringify(orgDidData.document, null, 2)} />
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 style={{ marginBottom: '1.5rem' }}>2. Issue Employee Credential</h2>
                            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                                The organization issues a Verifiable Credential to an employee.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Employee Name</label>
                                    <input
                                        type="text"
                                        value={employeeName}
                                        onChange={(e) => setEmployeeName(e.target.value)}
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Role</label>
                                    <input
                                        type="text"
                                        value={employeeRole}
                                        onChange={(e) => setEmployeeRole(e.target.value)}
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white' }}
                                    />
                                </div>
                            </div>

                            {employeeDidData && (
                                <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    <p>Employee DID: <code style={{ color: 'var(--accent-primary)' }}>{employeeDidData.did}</code></p>
                                </div>
                            )}

                            <button
                                className="btn btn-primary"
                                onClick={handleIssueCredential}
                                disabled={loading}
                                style={{ width: '100%' }}
                            >
                                {loading ? 'Issuing...' : 'Sign & Issue Credential'}
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && credential && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 style={{ marginBottom: '1.5rem' }}>3. Employee Wallet</h2>
                            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                                The employee receives the credential in their digital wallet. It is cryptographically signed by the organization.
                            </p>

                            <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ margin: 0 }}>{credential.credentialSubject.name}</h3>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{credential.credentialSubject.role}</p>
                                    </div>
                                    <Shield color="var(--accent-primary)" size={32} />
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    <p>Issuer: {credential.issuer}</p>
                                    <p>Issued: {new Date(credential.issuanceDate).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <CodeBlock title="Verifiable Credential (JSON-LD)" code={JSON.stringify(credential, null, 2)} />

                            <button
                                className="btn btn-primary"
                                onClick={() => setStep(3)}
                                style={{ marginTop: '2rem', width: '100%' }}
                            >
                                Proceed to Verification <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 style={{ marginBottom: '1.5rem' }}>4. Verify & Login</h2>
                            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                                The employee tries to access a restricted portal. The portal requests the "Employee Credential" and verifies the signature.
                            </p>

                            <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)' }}>
                                <Lock size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
                                <h3>Restricted Employee Portal</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Please authenticate with your Verified ID.</p>

                                {!verificationResult ? (
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleVerify}
                                        disabled={loading}
                                    >
                                        {loading ? 'Verifying Signature...' : 'Login with Verified ID'}
                                    </button>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        style={{
                                            padding: '1rem',
                                            background: 'rgba(74, 222, 128, 0.1)',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid rgba(74, 222, 128, 0.2)',
                                            display: 'inline-block'
                                        }}
                                    >
                                        <p style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
                                            <CheckCircle size={24} /> Access Granted
                                        </p>
                                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                            Credential verified against <strong>{domain}</strong>
                                        </p>
                                    </motion.div>
                                )}
                            </div>

                            {verificationResult && (
                                <button
                                    className="btn btn-outline"
                                    onClick={() => {
                                        setStep(0);
                                        setVerificationResult(null);
                                        setCredential(null);
                                        setOrgDidData(null);
                                    }}
                                    style={{ marginTop: '2rem', width: '100%' }}
                                >
                                    Reset Demo
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Sandbox;
