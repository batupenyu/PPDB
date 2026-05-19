import { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('user:', JSON.stringify(user), 'pass:', JSON.stringify(pass));
    if (user.trim() === 'admin' && pass.trim() === 'admin123') {
      sessionStorage.setItem('auth', '1');
      onLogin();
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', width: '320px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>🔐 Login SPMB</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label>Username</label>
            <input className="form-control" value={user} onChange={e => setUser(e.target.value)} autoFocus />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label>Password</label>
            <input className="form-control" type="password" value={pass} onChange={e => setPass(e.target.value)} />
          </div>
          {error && <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>}
          <button className="btn btn-primary" style={{ width: '100%' }} type="submit">Masuk</button>
        </form>
      </div>
    </div>
  );
}
