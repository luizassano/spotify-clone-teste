import api from "./api";

export const AuthService = {
  isCheckingAuth: false,

  async signup(userData) {
    try {
      const response = await api.post("/users/register", userData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error("E-mail já cadastrado");
      }
      throw new Error(
        error.response?.data?.message || "Erro ao cadastrar usuário"
      );
    }
  },

  async login(credentials) {
    console.log('[AuthService] Iniciando login com credenciais:', credentials);
    try {
      const response = await api.post('/users/login', {
        email: credentials.email,
        password: credentials.password,
      });
  
      console.log('[AuthService] Resposta completa:', response);
      
      const token = response.data?.token || response.token;
      
      if (!token) {
        throw new Error('Token não recebido na resposta');
      }
  
      console.log('[AuthService] Token recebido, armazenando no localStorage');
      
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload.id;
      
      if (!userId) {
        throw new Error('ID do usuário não encontrado no token');
      }
  
      const user = {
        id: userId,
        email: credentials.email
      };
  
      this.setAuthData(token, user);
      
      return {
        success: true,
        token,
        user
      };
    } catch (error) {
      console.error('[AuthService] Erro no login:', error);
      throw error;
    }
  },

  setAuthData(token, user) {
    if (!token) {
      throw new Error('Token não fornecido');
    }
  
    localStorage.setItem("authToken", token);
  
    const userData = {
      id: user?.id || null,
      email: user?.email || 'unknown@example.com',
      name: user?.name || 'Usuário'
    };
  
    localStorage.setItem("userData", JSON.stringify(userData));
    window.dispatchEvent(new Event('authChange'));
  },
  async validateToken() {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return false;

      const parts = token.split('.');
      if (parts.length !== 3) {
        this.logout();
        return false;
      }

      const payload = JSON.parse(atob(parts[1]));
      
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro ao validar token:', error);
      this.logout();
      return false;
    }
  },
  getCurrentUser() {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  },

getCurrentUserId() {
    const user = this.getCurrentUser();
    console.log('User data from storage:', user); 
    return user?.id || null;
  },

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    window.dispatchEvent(new Event('authChange'));
  },

  isAuthenticated() {
    if (typeof window === 'undefined') {
      return false;
    }
    return !!localStorage.getItem("authToken");
  },

  onAuthChange(callback) {
    window.addEventListener('authChange', callback);
    return () => window.removeEventListener('authChange', callback);
  }
};