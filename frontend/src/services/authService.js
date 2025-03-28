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

      console.log('[AuthService] Resposta do login:', response);

      if (response.token) {
        console.log('[AuthService] Token recebido, armazenando no localStorage');
        this.setAuthData(response.token, credentials.email);
      }

      return response;
    } catch (error) {
      console.error('[AuthService] Erro no login:', error);
      if (error.response?.status === 401) {
        throw new Error("Email ou senha incorretos");
      } else if (error.response?.status === 404) {
        throw new Error("Usuário não encontrado");
      }
      throw new Error(error.message || "Erro ao fazer login");
    }
  },

  setAuthData(token, email) {
    localStorage.setItem("authToken", token);
    localStorage.setItem(
      "userData",
      JSON.stringify({ email })
    );
    window.dispatchEvent(new Event('authChange'));
  },

  async validateToken() {
    const token = localStorage.getItem("authToken");
    if (!token) return false;

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        this.logout();
        return false;
      }

      const payload = JSON.parse(atob(parts[1]));
      
      if (payload.exp && payload.exp * 1000 < Date.now()) {
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