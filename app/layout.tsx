import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/shared/Footer';
import { Navbar } from '@/components/shared/Navbar';
import { getMe } from '@/service/getMe';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@/components/shared/ThemeProvider';


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
<html lang="en" suppressHydrationWarning> 
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 max-w-[2480px] mx-auto transition-colors duration-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            <Navbar user={user} />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster position="top-right" richColors />
          </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}