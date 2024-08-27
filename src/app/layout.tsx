'use client';
import './globals.css';
import { Providers } from './providers';
import 'bootstrap/dist/css/bootstrap.min.css';
import localFont from '@next/font/local';

const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/Iranian_sans.ttf',
      weight: '1000',
    },
    // {
    //   path: '../../public/fonts/Poppins-Bold.ttf',
    //   weight: '700'
    // }
  ],
  variable: '--font-poppins',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans dark`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
