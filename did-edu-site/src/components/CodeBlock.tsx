import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
}

const CodeBlock = ({ code, language = 'json', title }: CodeBlockProps) => {
    return (
        <div style={{
            background: '#1e1e1e',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid #333',
            margin: '1rem 0'
        }}>
            {title && (
                <div style={{
                    padding: '0.5rem 1rem',
                    background: '#252526',
                    borderBottom: '1px solid #333',
                    fontSize: '0.8rem',
                    color: '#ccc',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span>{title}</span>
                    <span style={{ textTransform: 'uppercase', opacity: 0.6 }}>{language}</span>
                </div>
            )}
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{ margin: 0, borderRadius: '0 0 8px 8px', background: 'transparent' }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
