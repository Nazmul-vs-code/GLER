import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from './components/shared/Navbar';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className={`${poppins.className} font-sans antialiased`}>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />

          <Navbar />

          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}