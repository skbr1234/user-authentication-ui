import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { Layout } from '../src/components/Layout';
import { RegisterForm } from '../src/components/RegisterForm';

export default function RegisterPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('auth.register')} - MyGolya</title>
        <meta name="description" content={t('auth.description')} />
      </Head>
      
      <Layout centered maxWidth="md">
        <RegisterForm />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};