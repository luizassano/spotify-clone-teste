import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar, Nav, Container, Image, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import styles from "../styles/navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthService } from "../services/authService";

const CustomNavbar = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthPage = router.pathname === '/' || router.pathname === '/signup';

  useEffect(() => {
    setIsClient(true);
    setIsAuthenticated(AuthService.isAuthenticated());
    
    const handleAuthChange = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
    };

    const cleanup = AuthService.onAuthChange(handleAuthChange);

    return () => cleanup();
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.logout(); 
      setIsAuthenticated(false); 
      router.push('/').then(() => {
        window.location.reload(); 
      });
    } catch (error) {
      console.error('Erro durante logout:', error);
    }
  };

  if (!isClient) {
    return (
      <Navbar expand="lg" className={styles.customNavbar}>
        <Container>
          <Navbar.Brand href="/" className={styles.brand}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
              alt="Spotify Logo"
              className={styles.logo}
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar expand="lg" className={styles.customNavbar}>
      <Container>
        <Navbar.Brand href="/" className={styles.brand}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
            alt="Spotify Logo"
            className={styles.logo}
          />
        </Navbar.Brand>
        
        {!isAuthPage && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Link href="/home" passHref legacyBehavior>
                  <Nav.Link className={styles.navItem}>Home</Nav.Link>
                </Link>
                <Link href="/songs" passHref legacyBehavior>
                  <Nav.Link className={styles.navItem}>Músicas</Nav.Link>
                </Link>
                <Link href="/about" passHref legacyBehavior>
                  <Nav.Link className={styles.navItem}>Sobre</Nav.Link>
                </Link>
                
                {isAuthenticated && (
                  <Button 
                    variant="outline-light" 
                    className={styles.logoutButton}
                    onClick={handleLogout}
                    suppressHydrationWarning
                  >
                    Sair
                  </Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;