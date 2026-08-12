import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/shared/Footer';
import { Navbar } from '@/components/shared/Navbar';
import { getMe } from '@/service/getMe';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RentNest - Rental Property & Request Management',
  description: 'Find and request rental properties with ease.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await getMe();
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900 max-w-[2480px] mx-auto`}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <Navbar user={user} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}