import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LuLu & FuSE',
  description: 'A safety-first dating platform for consenting adults',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
