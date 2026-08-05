"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    country: '',
    dateOfBirth: '',
  });
  const [status, setStatus] = useState('');
  const authBase = process.env.NEXT_PUBLIC_AUTH_URL || 'http://127.0.0.1:3001';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Submitting your registration request...');

    const response = await fetch('http://127.0.0.1:3001/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        phone: '+15551234567',
        displayName: form.username,
      }),
    });

    const data = await response.json();
    setStatus(data.message || 'Registration submitted.');

    if (response.ok) {
      router.push('/onboarding');
    }
  }

  return (
    <main className="page-shell">
      <div className="auth-card" style={{ maxWidth: 900, margin: '40px auto' }}>
        <div className="split-grid">
          <div>
            <p className="eyebrow">Join LuLu & FuSE</p>
            <h1>Create a profile that feels warm, safe, and real.</h1>
            <p className="secondary-text">
              Get started with a secure sign-up flow, connect through Google, or create your account with a few simple details.
            </p>
            <div style={{ display: 'grid', gap: 14, marginTop: 24 }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => window.location.assign(`${authBase}/auth/google`)}
              >
                Continue with Google
              </button>
              <div className="secondary-text" style={{ textAlign: 'center' }}>
                Or continue with email
              </div>
            </div>
          </div>

          <div className="panel-card">
            <p className="eyebrow">Why LuLu & FuSE?</p>
            <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text)' }}>
              <li>Verified profiles for safer connections</li>
              <li>Consent-first onboarding and privacy controls</li>
              <li>Simple, modern experience built for authenticity</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 32, color: '#555' }}>
          Already have an account? <a className="small-link" href="/login">Sign in</a>
        </div>

        <form onSubmit={handleSubmit} className="form-grid" style={{ marginTop: 28 }}>
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Display name" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <input placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} required />
          <input type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} required />
          <button className="btn btn-primary" type="submit">Create account</button>
        </form>

        {status ? <p className="status-banner">{status}</p> : null}
      </div>
    </main>
  );
}
