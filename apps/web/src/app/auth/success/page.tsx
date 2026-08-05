'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthSuccessPage() {
  const router = useRouter();
  const [message, setMessage] = useState('Finalizing sign-in...');

  useEffect(() => {
    setMessage('Sign-in successful! Redirecting to onboarding...');
    const timer = setTimeout(() => router.push('/onboarding'), 1200);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="page-shell">
      <div className="auth-card" style={{ maxWidth: 640, margin: '40px auto', textAlign: 'center' }}>
        <p className="eyebrow">Signed in</p>
        <h1>Google sign-in complete</h1>
        <p className="secondary-text">Welcome back. We’re sending you to onboarding now so you can finish setting up your profile.</p>
        <div style={{ marginTop: 28 }}>
          <button className="btn btn-primary" onClick={() => router.push('/onboarding')}>
            Continue to onboarding
          </button>
        </div>
      </div>
    </main>
  );
}
