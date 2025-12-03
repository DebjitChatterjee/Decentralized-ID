import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Building, CheckCircle, ArrowRight, Lock, FileCheck } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import { generateDID, issueCredential, verifyCredential } from '../utils/didUtils';
import { QRCodeSVG } from 'qrcode.react';
import type { DIDGenerationResult, VerifiableCredential } from '../utils/didUtils';

const CredentialCard = ({ credential }: { credential: VerifiableCredential }) => {
    // Extract domain/org name from issuer DID (did:web:example.com -> example.com)
    const orgName = credential.issuer.startsWith('did:web:')
        ? credential.issuer.replace('did:web:', '')
        : 'Organization';

    return (
        <div style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)',
            position: 'relative',
            overflow: 'hidden',
            margin: '0 auto'
        }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ position: 'absolute', bottom: -40, left: -20, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>{credential.credentialSubject.name}</h3>
                        <p style={{ margin: '4px 0 0 0', opacity: 0.9 }}>{credential.credentialSubject.role}</p>
                    </div>
                    <Shield size={32} color="white" />
                </div>

                <div style={{ marginTop: 'auto' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Organization</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '1.1rem', fontWeight: '600' }}>{orgName}</p>
                </div>
            </div>
        </div>
    );
};

const Sandbox = () => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // Step 1: Org Setup
    const [domain, setDomain] = useState('example.com');
    const [orgDidData, setOrgDidData] = useState<DIDGenerationResult | null>(null);

    // Step 2: Employee Details
    const [employeeName, setEmployeeName] = useState('Alice Smith');
    const [employeeRole, setEmployeeRole] = useState('Senior Engineer');

    const [credential, setCredential] = useState<VerifiableCredential | null>(null);
    const [showIssuanceQR, setShowIssuanceQR] = useState(false);

    // Step 4: Verification
    const [verificationResult, setVerificationResult] = useState<'success' | 'failure' | null>(null);
    const [showVerificationQR, setShowVerificationQR] = useState(true);

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

    const handlePrepareIssuance = () => {
        if (!employeeName || !employeeRole) return;
        setShowIssuanceQR(true);
    };

    const handleIssueCredential = async () => {
        setLoading(true);
        try {
            // 1. Create a DID for the employee (usually did:key for users)
            const empDid = await generateDID('key');
            // setEmployeeDidData(empDid); // Removed unused state update

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
                    setShowIssuanceQR(false);
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

                            {!showIssuanceQR ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
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

                                    <button
                                        className="btn btn-primary"
                                        onClick={handlePrepareIssuance}
                                        disabled={loading || !employeeName || !employeeRole}
                                        style={{ width: '100%' }}
                                    >
                                        Generate Credential Offer
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)' }}
                                >
                                    <h3 style={{ marginBottom: '1rem' }}>Scan to Receive Credential</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                        Scan this QR code with your digital wallet to accept the credential.
                                    </p>

                                    <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem', display: 'inline-block', marginBottom: '2rem' }}>
                                        <QRCodeSVG
                                            value={JSON.stringify({ type: 'CredentialOffer', issuer: orgDidData?.did, name: employeeName, role: employeeRole })}
                                            size={200}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleIssueCredential}
                                            disabled={loading}
                                            style={{ minWidth: '200px' }}
                                        >
                                            {loading ? 'Issuing...' : 'Simulate Scan & Accept'}
                                        </button>
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => setShowIssuanceQR(false)}
                                            disabled={loading}
                                            style={{ minWidth: '200px' }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.div>
                            )}
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

                            <div style={{ marginBottom: '3rem' }}>
                                <CredentialCard credential={credential} />
                            </div>

                            <CodeBlock title="Verifiable Credential (JSON-LD)" code={JSON.stringify(credential, null, 2)} />

                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setStep(3);
                                    setShowVerificationQR(true);
                                }}
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

                                {showVerificationQR && !verificationResult ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem' }}>
                                            <QRCodeSVG
                                                value={JSON.stringify({ type: 'VerificationRequest', domain })}
                                                size={200}
                                            />
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Scan with your wallet to login</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleVerify}
                                            disabled={loading}
                                        >
                                            {loading ? 'Verifying Signature...' : 'Simulate Scan & Login'}
                                        </button>
                                    </div>
                                ) : verificationResult && (
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
                                        setShowIssuanceQR(false);
                                        setShowVerificationQR(true);
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
