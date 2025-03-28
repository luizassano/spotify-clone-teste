import api from "./api";

export const AuthService = {
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
        localStorage.setItem("authToken", response.token);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email: credentials.email,
          })
        );
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


  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  },

  isAuthenticated() {
    return !!localStorage.getItem("authToken");
  },
};
