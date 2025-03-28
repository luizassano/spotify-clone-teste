import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthService } from '../services/authService';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);
  
    useEffect(() => {
      const verifyAuth = async () => {
        try {
          const isValid = await AuthService.validateToken();
          
          if (!isValid) {
            console.log('[ProtectedRoute] Token inválido, redirecionando...');
            AuthService.logout();
            router.push('/login');
          } else {
            console.log('[ProtectedRoute] Token válido, permitindo acesso');
            setAuthChecked(true);
          }
        } catch (error) {
          console.error('[ProtectedRoute] Erro na verificação:', error);
          router.push('/login');
        }
      };
  
      verifyAuth();
  
      const authChangeListener = () => verifyAuth();
      window.addEventListener('authChange', authChangeListener);
      
      return () => {
        window.removeEventListener('authChange', authChangeListener);
      };
    }, [router]);
  
    if (!authChecked) {
      return <div>Verificando autenticação...</div>;
    }
  
    return <>{children}</>;
  };

export default ProtectedRoute;