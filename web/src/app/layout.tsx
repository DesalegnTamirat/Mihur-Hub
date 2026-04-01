import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Mihur-Hub',
  description: 'Mihur-Hub project platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark antialiased">
      <body className="font-mono">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
