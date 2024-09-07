// app/providers.tsx
'use client';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { HandleOnComplete } from './Components/onComplete/route-change-complete';
import { Toaster } from 'react-hot-toast';
import { useRouter } from './Components/onComplete/router';
import NavBar from './Components/helper_comp/Navbar/page';
// import Footer from './Components/helper_comp/Footer/Footer';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <NextUIProvider className="col-12 p-0" navigate={router.push}>
      <NextThemesProvider attribute="class" enableColorScheme defaultTheme="dark">
        <HandleOnComplete />
        <NavBar />
        <section className="col-12 layout-sec p-1">{children}</section>
        <Toaster toastOptions={{ className: 'react-hot-toast' }} />
        {/* <Footer /> */}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
