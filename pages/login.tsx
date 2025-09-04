import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { Layout } from '../src/components/Layout';
import { LoginForm } from '../src/components/LoginForm';

export default function LoginPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('auth.login')} - MyGolya</title>
        <meta name="description" content={t('auth.description')} />
      </Head>

      <Layout centered maxWidth="md">
        <LoginForm />
      </Layout>
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
