import MainLayout from "../layouts/MainLayout";
import { Container, Button, Image } from "react-bootstrap";
import Link from "next/link";

const Home = () => {
  return (
    <MainLayout title="Home - Spotify Clone">
      <div className="home-page">
        <Container className="text-center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
            alt="Spotify Logo"
            className="logo"
          />
          <h1 className="title">Milhões de músicas à sua escolha.</h1>
          <p className="subtitle">Ouça o que quiser, sempre que quiser.</p>
          <Link href="/songs" legacyBehavior>
            <a>
              <Button variant="success" size="lg" className="explore-button">
                Explorar músicas
              </Button>
            </a>
          </Link>
        </Container>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

        .home-page {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #1db954, #191414);
          color: white;
          text-align: center;
          font-family: "Montserrat", sans-serif;
          animation: fadeIn 1s ease-in-out;
        }

        .logo {
          width: 200px;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInUp 1s forwards 0.5s;
        }

        .title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 10px;
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInUp 1s forwards 0.7s;
        }

        .subtitle {
          font-size: 1.5rem;
          margin-bottom: 30px;
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInUp 1s forwards 0.9s;
        }

        .explore-button {
          font-size: 1.2rem;
          font-weight: bold;
          padding: 12px 30px;
          border-radius: 30px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease-in-out, box-shadow 0.2s;
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInUp 1s forwards 1.1s;
        }

        .explore-button:hover {
          transform: scale(1.05);
          box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </MainLayout>
  );
};

export default Home;
