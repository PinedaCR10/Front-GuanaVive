import { useEffect, useState } from 'react';
import { useAuth } from '../../features/auth';
import { Loading } from './Loading';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const { checkAuth } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuth();
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();
  }, [checkAuth]);

  if (!isInitialized) {
    return <Loading />;
  }

  return <>{children}</>;
};
