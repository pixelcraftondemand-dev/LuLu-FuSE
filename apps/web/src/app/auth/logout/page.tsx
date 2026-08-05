'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function signOut() {
      await fetch('http://127.0.0.1:3001/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      router.replace('/signup');
    }

    signOut();
  }, [router]);

  return (
    <main className="page-shell">
      <div className="section-card" style={{ maxWidth: 640, margin: '40px auto' }}>
        <h1>Signed out</h1>
        <p>You have been signed out successfully. Redirecting to signup...</p>
      </div>
    </main>
  );
}
