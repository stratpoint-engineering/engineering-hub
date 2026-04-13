export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '1rem',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)',
    }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 700, margin: 0, color: 'var(--accent)' }}>404</h1>
      <p style={{ color: 'var(--text-muted)', margin: 0 }}>This page could not be found.</p>
      <a href="/" style={{ color: 'var(--link)', fontSize: '0.875rem' }}>Back to home</a>
    </div>
  )
}
