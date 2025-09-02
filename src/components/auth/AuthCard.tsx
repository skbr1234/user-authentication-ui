import { ReactNode } from 'react';
import { Layout } from '../Layout';

interface AuthCardProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function AuthCard({ children, title, description }: AuthCardProps) {
  return (
    <Layout centered maxWidth="md">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
        {children}
      </div>
    </Layout>
  );
}