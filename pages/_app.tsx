import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '../src/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);