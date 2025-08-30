import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../src/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    // Set document direction for RTL languages
    const isRTL = locale === 'ar' || locale === 'ur';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = locale || 'en';
  }, [locale]);

  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);