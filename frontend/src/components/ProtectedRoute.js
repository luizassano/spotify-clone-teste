import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthService } from '../services/authService';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    checked: false,
    isValid: false
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 

    let mounted = true;

    const verifyAuth = async () => {
      try {
        const isValid = await AuthService.validateToken();
        
        if (mounted) {
          setAuthState({
            checked: true,
            isValid
          });

          if (!isValid) {
            AuthService.logout();
            router.push('/login');
          }
        }
      } catch (error) {
        if (mounted) {
          setAuthState({
            checked: true,
            isValid: false
          });
          router.push('/login');
        }
      }
    };

    const handleAuthChange = () => verifyAuth();

    verifyAuth();

    const cleanup = AuthService.onAuthChange(handleAuthChange);

    return () => {
      mounted = false;
      cleanup();
    };
  }, [router]);

  if (!isClient) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!authState.checked) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!authState.isValid) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;