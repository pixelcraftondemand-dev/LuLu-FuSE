'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');
  const authBase = process.env.NEXT_PUBLIC_AUTH_URL || 'http://127.0.0.1:3001';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Logging in...');

    const response = await fetch(`${authBase}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (!response.ok) {
      setStatus(data.message || 'Login failed.');
      return;
    }

    setStatus('Login successful; redirecting to onboarding...');
    router.push('/onboarding');
  }

  return (
    <main className="page-shell login-shell">
      <div className="login-card">
        <div className="login-hero">
          <p className="eyebrow">Welcome back</p>
          <h1>Sign in with confidence.</h1>
          <p className="hero-copy">
            Choose the secure way you want to continue your connection journey.
          </p>
        </div>

        <div className="login-actions">
          <button type="button" className="btn btn-google large-btn" onClick={() => window.location.assign(`${authBase}/auth/google`)}>
            <span>G</span>
            Continue with Google
          </button>
          <button type="button" className="btn btn-outline large-btn" onClick={() => setStatus('Use the email form below to sign in.') }>
            <span>✉️</span>
            Continue with email
          </button>
        </div>

        <p className="login-note">We’ll never share anything without your permission.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="btn btn-primary large-btn" type="submit">Sign in</button>
        </form>

        {status ? <p className="status-banner">{status}</p> : null}
      </div>
    </main>
  );
}
