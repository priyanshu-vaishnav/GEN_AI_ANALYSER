const StatusScreen = ({ loading, error, success }) => {

  if (loading) {
    return (
      <div style={styles.wrapSpinner}>
        <div style={styles.spinner}></div>
        <p style={styles.spinnerLabel}>Please wait…</p>
      </div>
    );
  }

  if (success) {
    return (
      <div style={styles.wrap}>
        <div style={{ ...styles.iconCircle, background: '#d1fae5' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <p style={{ ...styles.title, color: '#065f46' }}>Done!</p>
        <p style={styles.sub}>{success}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.wrap}>
        <div style={{ ...styles.iconCircle, background: '#fee2e2' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <p style={{ ...styles.title, color: '#991b1b' }}>Something went wrong</p>
        <p style={styles.sub}>{error}</p>
      </div>
    );
  }

  return null;
};

const styles = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '2rem',
    
  },
    wrapSpinner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '2rem',
    height: '100vh',
  },
  spinner: {
    width: '36px',
    height: '36px',
    border: '2.5px solid #e5e7eb',
    borderTopColor: '#3b82f6',
    borderRadius: '50%',
    animation: 'spin 0.75s linear infinite',
  },
  spinnerLabel: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
  iconCircle: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '15px',
    fontWeight: '500',
    margin: 0,
  },
  sub: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
};

export default StatusScreen;