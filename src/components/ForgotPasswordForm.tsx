import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card } from '@/components/Layout';
import { authApi } from '@/services/authApi';
import { Loader2, ArrowLeft } from 'lucide-react';

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
      <Card className="w-full max-w-md mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{t('auth.emailVerification')}</h1>
          <p className="text-sm text-muted-foreground">
            {t('auth.checkEmail')}
          </p>
          <Link href="/login" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('auth.login')}
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">{t('auth.forgotPassword')}</h1>
          <p className="text-sm text-muted-foreground">
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
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder={t('auth.email')}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{t('validation.invalidEmail')}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('auth.submit')}
          </Button>
        </form>

        <div className="text-center">
          <Link href="/login" className="inline-flex items-center text-sm text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('auth.login')}
          </Link>
        </div>
      </div>
    </Card>
  );
}