import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building, ShieldCheck, Database } from 'lucide-react';

interface NodeProps {
    icon: React.ReactElement;
    label: string;
    x: string;
    y: string;
    active: boolean;
    onClick: () => void;
}

const Node = ({ icon, label, x, y, active, onClick }: NodeProps) => (
    <motion.div
        onClick={onClick}
        style={{
            position: 'absolute',
            left: x,
            top: y,
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
            textAlign: 'center',
            zIndex: 10
        }}
        animate={{ scale: active ? 1.1 : 1 }}
    >
        <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: active ? 'var(--accent-gradient)' : 'var(--bg-card)',
            border: `2px solid ${active ? 'transparent' : 'var(--border-color)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: active ? '0 0 20px var(--accent-primary)' : 'none',
            transition: 'all 0.3s ease'
        }}>
            {React.cloneElement(icon, { size: 32, color: active ? 'white' : 'var(--text-secondary)' } as any)}
        </div>
        <p style={{ marginTop: '0.5rem', fontWeight: 'bold', color: active ? 'var(--accent-primary)' : 'var(--text-primary)' }}>{label}</p>
    </motion.div>
);

interface ConnectionProps {
    start: { x: string; y: string };
    end: { x: string; y: string };
    active: boolean;
}

const Connection = ({ start, end, active }: ConnectionProps) => {
    return (
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            <motion.line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={active ? 'var(--accent-primary)' : 'var(--border-color)'}
                strokeWidth="2"
                strokeDasharray={active ? "5,5" : "0"}
                animate={active ? { strokeDashoffset: [0, -20] } : {}}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
        </svg>
    );
};

const InteractiveDiagram = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { title: "1. Issue", description: "Issuer gives a Verifiable Credential to the Holder." },
        { title: "2. Store", description: "Holder stores the credential in their digital wallet." },
        { title: "3. Present", description: "Holder presents a proof to the Verifier." },
        { title: "4. Verify", description: "Verifier checks the proof against the DID Registry (Blockchain)." }
    ];

    return (
        <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            marginTop: '2rem'
        }}>
            <div style={{ height: '400px', position: 'relative', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                {/* Nodes */}
                <Node icon={<Building />} label="Issuer" x="50%" y="20%" active={activeStep === 0} onClick={() => setActiveStep(0)} />
                <Node icon={<User />} label="Holder" x="20%" y="80%" active={activeStep === 1 || activeStep === 2} onClick={() => setActiveStep(1)} />
                <Node icon={<ShieldCheck />} label="Verifier" x="80%" y="80%" active={activeStep === 3} onClick={() => setActiveStep(3)} />
                <Node icon={<Database />} label="DID Registry" x="50%" y="50%" active={false} onClick={() => { }} />

                {/* Connections */}
                <Connection start={{ x: '50%', y: '20%' }} end={{ x: '20%', y: '80%' }} active={activeStep === 0} />
                <Connection start={{ x: '20%', y: '80%' }} end={{ x: '80%', y: '80%' }} active={activeStep === 2} />
                <Connection start={{ x: '80%', y: '80%' }} end={{ x: '50%', y: '50%' }} active={activeStep === 3} />
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    {steps.map((_step, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveStep(index)}
                            className={`btn ${activeStep === index ? 'btn-primary' : 'btn-outline'}`}
                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h3>{steps[activeStep].title}</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>{steps[activeStep].description}</p>
                </motion.div>
            </div>
        </div>
    );
};

export default InteractiveDiagram;
