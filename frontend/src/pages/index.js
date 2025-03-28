import MainLayout from "../layouts/MainLayout";
import { Container, Button, Form, InputGroup, Alert } from "react-bootstrap";
import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import styles from "../styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { AuthService } from "../services/authService";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[Login] Iniciando submit do formulário");
    setLoading(true);
    setError(null);

    try {
      console.log("[Login] Dados do formulário:", formData);
      const result = await AuthService.login({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        console.log("[Login] Login bem-sucedido, resposta:", result);
        console.log("[Login] Redirecionando para /home");

        await new Promise((resolve) => setTimeout(resolve, 100));
        router.push("/home");
      }
    } catch (err) {
      console.error("[Login] Erro no login:", err);
      setError(
        err.message || "Erro ao fazer login. Verifique suas credenciais."
      );
    } finally {
      console.log("[Login] Finalizando processo de login");
      setLoading(false);
    }
  };
  return (
    <MainLayout title="Login - Spotify Clone">
      <div className={styles.container}>
        <Container
          className="text-center d-flex flex-column justify-content-center"
          style={{ maxWidth: "400px" }}
        >
          <div className={styles.spotifyLogo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#1DB954"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>

          <h1 className={styles.title}>Entrar no Spotify Clone</h1>

          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          <Form className={styles.loginForm} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <InputGroup>
                <InputGroup.Text className={styles.inputIcon}>
                  <FiMail size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Digite seu email"
                  className={styles.inputField}
                  size="lg"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-4">
              <InputGroup>
                <InputGroup.Text className={styles.inputIcon}>
                  <FiLock size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Digite sua senha"
                  className={styles.inputField}
                  size="lg"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </InputGroup>
            </Form.Group>

            <Button
              variant="success"
              size="lg"
              className={styles.loginButton}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </Form>

          <p className={styles.signupLink}>
            Não tem uma conta?{" "}
            <Link href="/signup" className="text-success fw-semibold">
              Cadastrar-se
            </Link>
          </p>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Login;
