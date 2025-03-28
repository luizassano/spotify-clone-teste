import MainLayout from "../layouts/MainLayout";
import { Container, Button, Form, InputGroup, Alert } from "react-bootstrap";
import Link from "next/link";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import styles from "../styles/Signup.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { AuthService } from "../services/authService";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
  
      console.log('Usuário registrado:', response);
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout title="Cadastro - Spotify Clone">
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

          <h1 className={styles.title}>Criar conta</h1>

          {error && (
            <Alert
              variant="danger"
              className="mb-4"
              onClose={() => setError(null)}
              dismissible
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" className="mb-4">
              Cadastro realizado com sucesso! Redirecionando...
            </Alert>
          )}

          <Form className={styles.signupForm} onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <InputGroup>
                <InputGroup.Text className={styles.inputIcon}>
                  <FiUser size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Nome completo"
                  className={styles.inputField}
                  size="lg"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength="3"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <InputGroup>
                <InputGroup.Text className={styles.inputIcon}>
                  <FiMail size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.inputField}
                  size="lg"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <InputGroup>
                <InputGroup.Text className={styles.inputIcon}>
                  <FiLock size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Senha (mínimo 6 caracteres)"
                  className={styles.inputField}
                  size="lg"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="6"
                  required
                />
              </InputGroup>
            </Form.Group>

            <Button
              variant="success"
              size="lg"
              className={styles.signupButton}
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
                  Cadastrando...
                </>
              ) : (
                "Cadastrar"
              )}
            </Button>
          </Form>

          <p className={styles.loginLink}>
            Já tem uma conta?{" "}
            <Link href="/" className="text-success fw-semibold">
              Entrar
            </Link>
          </p>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Signup;
