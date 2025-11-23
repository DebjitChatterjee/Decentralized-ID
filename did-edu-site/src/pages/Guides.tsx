import CodeBlock from '../components/CodeBlock';

const Guides = () => {
    const installCode = `npm install did-jwt did-resolver ethr-did-resolver`;

    const createDidCode = `import { EthrDID } from 'ethr-did';

// Create a new DID (on Ethereum Sepolia testnet)
const ethrDid = new EthrDID({
  identifier: '0x...', 
  privateKey: '...',
  chainNameOrId: 'sepolia'
});

console.log(ethrDid.did); 
// Output: did:ethr:sepolia:0x...`;

    const verifyCode = `import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';

// Configure Resolver
const providerConfig = { rpcUrl: 'https://sepolia.infura.io/...' };
const resolver = new Resolver(getResolver(providerConfig));

// Resolve a DID
const doc = await resolver.resolve('did:ethr:sepolia:0x...');
console.log(doc);`;

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1>Developer Guides</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                    Integrate Decentralized Identity into your applications.
                </p>
            </header>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                <section style={{ marginBottom: '4rem' }}>
                    <h2>1. Getting Started</h2>
                    <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                        To start working with DIDs in JavaScript, you'll need a few key libraries.
                        We recommend starting with <code>did-jwt</code> for signing/verifying and <code>did-resolver</code> for resolution.
                    </p>
                    <CodeBlock title="Installation" code={installCode} language="bash" />
                </section>

                <section style={{ marginBottom: '4rem' }}>
                    <h2>2. Creating a DID (Ether-DID)</h2>
                    <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                        Here's how to create a DID anchored on the Ethereum blockchain using the <code>ethr-did</code> library.
                    </p>
                    <CodeBlock title="Create DID" code={createDidCode} language="javascript" />
                </section>

                <section style={{ marginBottom: '4rem' }}>
                    <h2>3. Resolving a DID</h2>
                    <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                        Resolving a DID means fetching its DID Document to see its public keys and service endpoints.
                    </p>
                    <CodeBlock title="Resolve DID" code={verifyCode} language="javascript" />
                </section>

                <section>
                    <h2>4. Next Steps</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Once you have a DID, you can start issuing Verifiable Credentials (VCs).
                        Check out the <a href="https://www.w3.org/TR/vc-data-model/" style={{ color: 'var(--accent-primary)' }}>W3C VC Data Model</a> for more details.
                    </p>
                </section>

            </div>
        </div>
    );
};

export default Guides;
