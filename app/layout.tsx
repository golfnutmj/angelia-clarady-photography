import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Angelia Clarady | Nature & Landscape Photography',
  description:
    'Nature and landscape photographer capturing the quiet poetry of wild places — from misty mountain dawns to the delicate dance of light through ancient forests.',
  keywords: ['photography', 'nature', 'landscape', 'fine art prints', 'Angelia Clarady'],
  openGraph: {
    title: 'Angelia Clarady | Nature & Landscape Photography',
    description: 'Capturing the beauty of our wild world through fine art photography.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
