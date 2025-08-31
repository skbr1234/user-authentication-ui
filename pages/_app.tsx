import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../src/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const { locale } = router;
      // Set document direction for RTL languages
      const isRTL = locale === 'ar' || locale === 'ur';
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = locale || 'en';
    }
  }, [router.locale]);

  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);