import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { authApi } from '../../src/services/authApi';
import { AuthCard } from '../../src/components/auth/AuthCard';
import { StatusDisplay } from '../../src/components/auth/StatusDisplay';

export default function VerifyEmailTokenPage() {
  useTranslation('common');
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const hasVerified = useRef(false);

  useEffect(() => {
    if (router.isReady && token && typeof token === 'string' && !hasVerified.current) {
      verifyEmail(token);
    } else if (router.isReady && !token) {
      setStatus('error');
      setMessage('Invalid or missing verification token.');
    }
  }, [router.isReady, token]);

  const verifyEmail = async (verificationToken: string) => {
    if (hasVerified.current) return; // Prevent duplicate calls

    hasVerified.current = true;
    try {
      await authApi.verifyEmail(verificationToken);
      setStatus('success');
      setMessage('Your email has been successfully verified!');
    } catch {
      setStatus('error');
      setMessage('Invalid or expired verification link.');
    }
  };

  return (
    <>
      <Head>
        <title>Email Verification - MyGolya</title>
        <meta name="description" content="Email verification" />
      </Head>

      <AuthCard title="Email Verification">
        <StatusDisplay
          status={status}
          loadingText="Verifying Email..."
          successTitle="Email Verified!"
          successMessage={message}
          successButtonText="Continue to Login"
          successButtonHref="/login"
          errorTitle="Verification Failed"
          errorMessage={message}
          errorButtonText="Register Again"
          errorButtonHref="/register"
          errorSecondaryText="Back to Login"
          errorSecondaryHref="/login"
        />
      </AuthCard>
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
