import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { authApi } from '../services/authApi';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError('');
    try {
      await authApi.forgotPassword(data);
      setSuccess(true);
    } catch (err) {
      setError(t('errors.networkError'));
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('auth.emailVerification')}</h1>
          <p className="text-sm text-gray-600">
            {t('auth.checkEmail')}
          </p>
          <Link href="/login" className="inline-flex items-center text-blue-600 hover:text-blue-500">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            {t('auth.login')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('auth.forgotPassword')}</h1>
          <p className="text-sm text-gray-600">
            {t('auth.enterEmail')}
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('auth.email')}</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder={t('auth.email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{t('validation.invalidEmail')}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : t('auth.submit')}
          </button>
        </form>

        <div className="text-center">
          <Link href="/login" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            {t('auth.login')}
          </Link>
        </div>
      </div>
    </div>
  );
}