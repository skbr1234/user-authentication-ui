import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuthState } from '../hooks/useAuth';

import { PasswordInput } from './ui/PasswordInput';

const registerSchema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    role: z.enum(['buyer_renter', 'seller_landlord']),
    acceptTerms: z.boolean().refine((val) => val === true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { register: registerUser } = useAuthState();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');
    try {
      // Extract only the fields needed for registration
      const registerData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      };
      await registerUser(registerData);
      router.push('/dashboard');
    } catch {
      setError(`${t('errors.registrationFailed')}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('auth.register')}</h1>
          <p className="text-sm text-gray-600">{t('auth.subtitle')}</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                {t('auth.firstName')}
              </label>
              <input
                id="firstName"
                {...register('firstName')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('auth.firstName')}
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">{t('validation.required')}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                {t('auth.lastName')}
              </label>
              <input
                id="lastName"
                {...register('lastName')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('auth.lastName')}
              />
              {errors.lastName && (
                <p className="text-sm text-red-600">{t('validation.required')}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('auth.email')}
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={t('auth.email')}
            />
            {errors.email && <p className="text-sm text-red-600">{t('validation.invalidEmail')}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              {t('auth.phone')}
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={t('auth.phone')}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              {t('auth.role')}
            </label>
            <select
              id="role"
              {...register('role')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="buyer_renter">{t('auth.roles.buyer_renter')}</option>
              <option value="seller_landlord">{t('auth.roles.seller_landlord')}</option>
            </select>
          </div>

          <PasswordInput
            id="password"
            label={t('auth.password')}
            placeholder={t('auth.password')}
            error={errors.password ? t('validation.passwordTooShort') : undefined}
            {...register('password')}
          />

          <PasswordInput
            id="confirmPassword"
            label={t('auth.confirmPassword')}
            placeholder={t('auth.confirmPassword')}
            error={errors.confirmPassword ? t('validation.passwordsDoNotMatch') : undefined}
            {...register('confirmPassword')}
          />

          <div className="flex items-center space-x-2">
            <input
              id="acceptTerms"
              type="checkbox"
              {...register('acceptTerms')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-700">
              {t('auth.termsAndConditions')}
            </label>
          </div>
          {errors.acceptTerms && <p className="text-sm text-red-600">{t('validation.required')}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : t('auth.register')}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-500">
              {t('auth.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
