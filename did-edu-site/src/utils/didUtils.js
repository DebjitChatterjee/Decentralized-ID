// Simple simulation of DID generation and resolution
// In a real app, this would use libraries like 'did-jwt', 'uport-connect', etc.

export const generateDID = async (type = 'key') => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const keyPair = {
        publicKey: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        privateKey: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    };

    let did;
    let document;

    if (type === 'key') {
        // Simulate did:key (Ed25519)
        const fingerprint = "z6M" + Array.from({ length: 45 }, () => Math.floor(Math.random() * 36).toString(36)).join('');
        did = `did:key:${fingerprint}`;

        document = {
            "@context": "https://www.w3.org/ns/did/v1",
            "id": did,
            "verificationMethod": [{
                "id": `${did}#keys-1`,
                "type": "Ed25519VerificationKey2018",
                "controller": did,
                "publicKeyBase58": "..." // Simplified
            }],
            "authentication": [`${did}#keys-1`],
            "assertionMethod": [`${did}#keys-1`]
        };
    } else if (type === 'web') {
        // Simulate did:web
        const domain = "example.com";
        did = `did:web:${domain}`;

        document = {
            "@context": "https://www.w3.org/ns/did/v1",
            "id": did,
            "verificationMethod": [{
                "id": `${did}#owner`,
                "type": "JsonWebKey2020",
                "controller": did,
                "publicKeyJwk": {
                    "kty": "EC",
                    "crv": "secp256k1",
                    "x": "...",
                    "y": "..."
                }
            }],
            "authentication": [`${did}#owner`]
        };
    }

    return { did, document, keyPair };
};

export const resolveDID = async (did) => {
    await new Promise(resolve => setTimeout(resolve, 600));

    // Mock resolution logic
    if (did.startsWith('did:key:')) {
        return {
            "@context": "https://www.w3.org/ns/did/v1",
            "id": did,
            "verificationMethod": [{
                "id": `${did}#keys-1`,
                "type": "Ed25519VerificationKey2018",
                "controller": did,
                "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
            }]
        };
    } else if (did.startsWith('did:web:')) {
        return {
            "@context": "https://www.w3.org/ns/did/v1",
            "id": did,
            "service": [{
                "id": `${did}#service-1`,
                "type": "LinkedDomains",
                "serviceEndpoint": "https://example.com"
            }]
        };
    }

    throw new Error("DID Method not supported in this sandbox");
};
