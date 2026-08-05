"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('travel, music, art');
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:3001/auth/me', {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Session expired');
        return res.json();
      })
      .then((data) => {
        setUserId(data.id);
      })
      .catch(() => {
        setStatus('Session expired. Redirecting to login...');
        router.replace('/login');
      });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!userId) {
      setStatus('Please sign in first before saving your onboarding information.');
      return;
    }

    setStatus('Saving your profile and safety preferences...');

    const response = await fetch('http://127.0.0.1:3001/profile', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        bio,
        interests: interests.split(',').map((item) => item.trim()).filter(Boolean),
      }),
    });

    const data = await response.json();
    setStatus(data.message || 'Profile saved.');
  }

  function handleLogout() {
    fetch('http://127.0.0.1:3001/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).finally(() => {
      router.push('/auth/logout');
    });
  }

  return (
    <main className="page-shell">
      <div className="auth-card" style={{ maxWidth: 820, margin: '40px auto' }}>
        <div className="split-grid">
          <div>
            <p className="progress-pill">Step 2 of 2</p>
            <h1>Build a profile that feels genuine.</h1>
            <p className="secondary-text">
              Share what matters most: who you are, what you enjoy, and the kind of experience you want to create.
            </p>
          </div>
          <div className="panel-card">
            <p className="eyebrow">Privacy first</p>
            <p className="secondary-text">Your onboarding details are used only to match you with people who share your values and safety preferences.</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 24 }}>
          <button type="button" className="btn btn-secondary" onClick={handleLogout}>
            Sign out
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-grid" style={{ marginTop: 24 }}>
          <textarea
            rows={5}
            placeholder="Tell people a little about yourself and what you’re looking for"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
          <input
            placeholder="Interests (comma separated)"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit">Save profile</button>
        </form>

        {status ? <p className="status-banner">{status}</p> : null}
      </div>
    </main>
  );
}
