import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from '@/hooks/useAuth';
import { UserRole } from '@/types/auth.types';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const { user, loading, isAuthenticated } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (requiredRole && user?.role !== requiredRole) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [loading, isAuthenticated, user, requiredRole, router, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}

interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function PublicRoute({ 
  children, 
  redirectTo = '/dashboard' 
}: PublicRouteProps) {
  const { isAuthenticated, loading } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [loading, isAuthenticated, router, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}