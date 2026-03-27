import ReactMarkdown from 'react-markdown';
import { useClipboard } from '../hooks/useClipboard';
import emailIcon from '@/assets/email.svg';
import linkedinIcon from '@/assets/linkedin.svg';
import slackIcon from '@/assets/slack.svg';
import teamsIcon from '@/assets/teams.svg';

const MODE_META = {
  email: { label: 'Email', icon: emailIcon },
  linkedin: { label: 'LinkedIn Post', icon: linkedinIcon },
  slack: { label: 'Slack Message', icon: slackIcon },
  teams: { label: 'Teams Message', icon: teamsIcon },
};

export default function OutputPanel({ output, isStreaming, error, mode }) {
  const { copied, copy } = useClipboard();
  const hasOutput = output.length > 0;
  const meta = MODE_META[mode] || MODE_META.email;

  return (
    <div className="output-card animate-fade-in-delay-1" style={{ display: 'flex', flexDirection: 'column', minHeight: 280 }}>
      {/* Header */}
      <div style={{
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={meta.icon} alt="" width={16} height={16} />
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            {meta.label}
          </span>
        </div>

        {hasOutput && !isStreaming && (
          <button
            className={`btn-copy ${copied ? 'copied' : ''}`}
            onClick={() => copy(output)}
            id="copy-btn"
            aria-label="Copy to clipboard"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '16px 20px', overflowY: 'auto' }}>
        {error ? (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 8,
            color: '#fca5a5',
            fontSize: '0.875rem',
            lineHeight: 1.6,
          }}>
            {error}
          </div>
        ) : hasOutput ? (
          <div className={`output-text markdown-body ${isStreaming ? 'streaming-cursor' : ''}`} id="output-content" aria-live="polite">
            <ReactMarkdown>{output}</ReactMarkdown>
          </div>
        ) : (
          <div className="empty-state">
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Your professional version will appear here.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', opacity: 0.5, maxWidth: 280 }}>
              Write something on the left and hit Translate.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
