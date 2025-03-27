import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css'; // Importa o CSS global aqui

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
