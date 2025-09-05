import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { authApi } from '../src/services/authApi';

export default function Home() {
  const { t } = useTranslation('common');
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await authApi.healthCheck();
        setIsHealthy(true);
      } catch {
        setIsHealthy(false);
      }
    };
    checkHealth();
  }, []);

  return (
    <>
      <Head>
        <title>{t('auth.title')} - MyGolya</title>
        <meta name="description" content={t('auth.description')} />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 sm:space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  isHealthy === null ? 'bg-yellow-400' : isHealthy ? 'bg-green-400' : 'bg-red-400'
                }`}
              ></div>
              <span className="text-sm text-gray-500">
                {isHealthy === null
                  ? 'Checking...'
                  : isHealthy
                    ? 'Service Online'
                    : 'Service Offline'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {t('auth.welcome')}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">{t('auth.subtitle')}</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <Link
              href="/login"
              className="w-full flex justify-center py-3 sm:py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
            >
              {t('auth.login')}
            </Link>

            <Link
              href="/register"
              className="w-full flex justify-center py-3 sm:py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
            >
              {t('auth.register')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};
