export default function Footer() {
  return (
    <footer style={{
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      borderTop: '1px solid var(--color-border-subtle)',
      color: 'var(--color-text-muted)',
      fontSize: '0.75rem',
    }}>
      <span>Think messy. Send polished.</span>
      <span style={{ opacity: 0.3 }}>·</span>
      <span style={{ opacity: 0.6 }}>DraftBuddy {new Date().getFullYear()}</span>
    </footer>
  );
}
