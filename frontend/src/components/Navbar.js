import Link from "next/link";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import styles from "../styles/navbar.module.css"; 
import "bootstrap/dist/css/bootstrap.min.css";

const CustomNavbar = () => {
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
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link className={styles.navItem}>Home</Nav.Link>
            </Link>
            <Link href="/songs" passHref legacyBehavior>
              <Nav.Link className={styles.navItem}>Músicas</Nav.Link>
            </Link>
            <Link href="/about" passHref legacyBehavior>
              <Nav.Link className={styles.navItem}>Sobre</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
