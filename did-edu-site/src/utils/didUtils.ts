export interface KeyPair {
    publicKey: string;
    privateKey: string;
}

export interface DIDDocument {
    '@context': string[];
    id: string;
    verificationMethod: Array<{
        id: string;
        type: string;
        controller: string;
        publicKeyHex: string;
    }>;
    authentication: string[];
}

export interface DIDGenerationResult {
    did: string;
    document: DIDDocument;
    keyPair: KeyPair;
}

export interface VerifiableCredential {
    '@context': string[];
    type: string[];
    issuer: string;
    issuanceDate: string;
    credentialSubject: {
        id: string;
        [key: string]: any;
    };
    proof: {
        type: string;
        created: string;
        proofPurpose: string;
        verificationMethod: string;
        jws: string;
    };
}

export const generateDID = async (type: 'key' | 'web' = 'key', domain?: string): Promise<DIDGenerationResult> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const keyPair = {
        publicKey: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        privateKey: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    };

    let did = '';
    if (type === 'web' && domain) {
        did = `did:web:${domain}`;
    } else {
        did = `did:key:z${keyPair.publicKey.substring(2, 10)}...`;
    }

    const document: DIDDocument = {
        '@context': ['https://www.w3.org/ns/did/v1'],
        id: did,
        verificationMethod: [{
            id: `${did}#owner`,
            type: 'EcdsaSecp256k1RecoveryMethod2020',
            controller: did,
            publicKeyHex: keyPair.publicKey
        }],
        authentication: [`${did}#owner`]
    };

    return { did, document, keyPair };
};

export const issueCredential = async (issuerDid: string, subjectDid: string, claims: any): Promise<VerifiableCredential> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiableCredential', 'EmployeeCredential'],
        issuer: issuerDid,
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
            id: subjectDid,
            ...claims
        },
        proof: {
            type: 'EcdsaSecp256k1Signature2019',
            created: new Date().toISOString(),
            proofPurpose: 'assertionMethod',
            verificationMethod: `${issuerDid}#owner`,
            jws: "eyJhbGciOiJFUzI1NksifQ.." + Math.random().toString(36).substring(7)
        }
    };
};

export const verifyCredential = async (vc: VerifiableCredential): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Mock verification logic
    return !!vc.proof.jws;
};

export const resolveDID = async (did: string): Promise<DIDDocument> => {
    await new Promise(resolve => setTimeout(resolve, 600));

    // Mock resolution
    if (did.startsWith('did:web') || did.startsWith('did:key') || did.startsWith('did:ethr')) {
        return {
            '@context': ['https://www.w3.org/ns/did/v1'],
            id: did,
            verificationMethod: [{
                id: `${did}#owner`,
                type: 'EcdsaSecp256k1RecoveryMethod2020',
                controller: did,
                publicKeyHex: "0x..."
            }],
            authentication: [`${did}#owner`]
        };
    }

    throw new Error("DID Method not supported in this sandbox");
};
