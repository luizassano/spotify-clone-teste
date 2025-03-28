import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthService } from '../services/authService';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isValidToken = await AuthService.validateToken();
        
        if (!isValidToken) {
          AuthService.logout();
          router.push('/');
        } else {
          setIsValid(true);
        }
      } catch (error) {
        console.error('Erro na verificação de autenticação:', error);
        router.push('/');
      }
    };

    verifyAuth();
  }, [router]);


  if (!isValid) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;