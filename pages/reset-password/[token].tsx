import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi } from '../../src/services/authApi';
import { AuthCard } from '../../src/components/auth/AuthCard';
import { StatusDisplay } from '../../src/components/auth/StatusDisplay';
import { PasswordInput } from '../../src/components/ui/PasswordInput';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordTokenPage() {
  useTranslation('common');
  const router = useRouter();
  const { token } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [tokenReady, setTokenReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setTokenReady(true);
    }
  }, [router.isReady]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token || typeof token !== 'string') {
      setError('Invalid reset token');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      await authApi.resetPassword({
        token,
        newPassword: data.password,
      });
      setSuccess(true);
    } catch {
      setError('Failed to reset password. The link may be expired or invalid.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!tokenReady) {
    return (
      <>
        <Head>
          <title>Reset Password - MyGolya</title>
        </Head>
        <AuthCard title="Reset Password">
          <StatusDisplay
            status="loading"
            loadingText="Loading..."
            successTitle=""
            successMessage=""
            successButtonText=""
            successButtonHref=""
            errorTitle=""
            errorMessage=""
          />
        </AuthCard>
      </>
    );
  }

  if (!token) {
    return (
      <>
        <Head>
          <title>Reset Password - MyGolya</title>
        </Head>
        <AuthCard title="Invalid Link">
          <StatusDisplay
            status="error"
            loadingText=""
            successTitle=""
            successMessage=""
            successButtonText=""
            successButtonHref=""
            errorTitle="Invalid Reset Link"
            errorMessage="This password reset link is invalid or missing."
            errorButtonText="Request New Link"
            errorButtonHref="/forgot-password"
            errorSecondaryText="Back to Login"
            errorSecondaryHref="/login"
          />
        </AuthCard>
      </>
    );
  }

  if (success) {
    return (
      <>
        <Head>
          <title>Password Reset Successful - MyGolya</title>
        </Head>
        <AuthCard title="Password Reset">
          <StatusDisplay
            status="success"
            loadingText=""
            successTitle="Password Reset Successful!"
            successMessage="Your password has been successfully updated."
            successButtonText="Continue to Login"
            successButtonHref="/login"
            errorTitle=""
            errorMessage=""
          />
        </AuthCard>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Reset Password - MyGolya</title>
        <meta name="description" content="Reset your password" />
      </Head>

      <AuthCard title="Reset Password" description="Enter your new password below">
        <div className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <PasswordInput
              id="password"
              label="New Password"
              placeholder="Enter new password"
              error={errors.password ? 'Password must be at least 8 characters' : undefined}
              {...register('password')}
            />

            <PasswordInput
              id="confirmPassword"
              label="Confirm New Password"
              placeholder="Confirm new password"
              error={errors.confirmPassword ? "Passwords don't match" : undefined}
              {...register('confirmPassword')}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="text-center">
            <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
              Back to Login
            </Link>
          </div>
        </div>
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
