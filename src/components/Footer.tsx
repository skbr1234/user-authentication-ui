import { useEffect, useState } from 'react';
import { authApi } from '../services/authApi';

export function Footer() {
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
    <footer className="text-center py-4 text-xs text-gray-500 border-t">
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center">
          <div
            className={`w-2 h-2 rounded-full mr-1 ${
              isHealthy === null ? 'bg-yellow-400' : isHealthy ? 'bg-green-400' : 'bg-red-400'
            }`}
          ></div>
          <span>{isHealthy === null ? 'Checking...' : isHealthy ? 'Online' : 'Offline'}</span>
        </div>
        <span>•</span>
        <span>© 2024 Auth Service</span>
        <span>•</span>
        <span>Secure Authentication</span>
      </div>
    </footer>
  );
}
