import favicon from '@/assets/favicon.svg';
export default function Header({ onLogoClick, showBackToApp, onTryApp }) {
  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src={favicon} alt="DraftBuddy" width={32} height={32} />
        <h1
          onClick={onLogoClick}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
            cursor: 'pointer',
          }}
        >
          DraftBuddy
        </h1>
        <span style={{
          fontSize: '0.7rem',
          color: 'var(--color-accent-primary)',
          fontWeight: 500,
          background: 'var(--color-accent-muted)',
          padding: '2px 6px',
          borderRadius: 4,
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
        }}>
          Beta
        </span>
      </div>

      {showBackToApp && (
        <button className="btn-cta" onClick={onTryApp} style={{ padding: '8px 20px', fontSize: '0.825rem' }}>
          Open App
        </button>
      )}
    </header>
  );
}
