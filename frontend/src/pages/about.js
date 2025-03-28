import MainLayout from "../layouts/MainLayout";
import { Container, Button, Image, Card } from "react-bootstrap";
import Link from "next/link";
import ProtectedRoute from "../components/ProtectedRoute";
import styles from "../styles/about.module.css";

const About = () => {
  return (
    <MainLayout title="Sobre - Spotify Clone">
      <ProtectedRoute>
        <div className={styles.container}>
          <Container className="text-center">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
              alt="Spotify Logo"
              className={styles.logo}
              fluid
            />
            <h1 className={`${styles.title} mt-4 mb-4`}>Sobre este projeto</h1>
            
            <Card className={`${styles.aboutCard} shadow-lg`}>
              <Card.Body>
                <Card.Text className="lead">
                  Olá! Este é meu projeto inspirado no Spotify, criado com paixão por música e tecnologia.
                </Card.Text>

                <Card.Text>
                  Quero ser sincero desde o início: este não é um clone perfeito, mas sim <strong>minha interpretação pessoal</strong> do Spotify, focando nas funcionalidades que considero mais interessantes do ponto de vista técnico.
                </Card.Text>
                
                <Card.Text>
                  Como desenvolvedor, optei por usar:
                </Card.Text>
                
                <ul className={`${styles.skillsList} mb-4`}>
                  <li className="mb-2">
                    <strong>Next.js</strong> - Para ter um projeto rápido e bem estruturado
                  </li>
                  <li className="mb-2">
                    <strong>Node.js</strong> - Criando um backend eficiente para gerenciar autenticação
                  </li>
                  <li className="mb-2">
                    <strong>React</strong> - Com componentes reutilizáveis e código limpo
                  </li>
                  <li className="mb-2">
                    <strong>Bootstrap</strong> - Para uma interface agradável sem perder tempo com CSS complexo
                  </li>
                </ul>
                
                <Card.Text>
                  Confesso que, com o tempo limitado, algumas coisas ficaram de fora da versão atual:
                </Card.Text>
                
                <ul className={`${styles.skillsList} mb-4`}>
                  <li className="mb-2">O player completo com todas suas funcionalidades</li>
                  <li className="mb-2">Sistema de playlists avançado</li>
                  <li className="mb-2">Integração com APIs de música reais</li>
                </ul>
                
                <Card.Text>
                  Mas o que está aqui foi feito com cuidado:
                </Card.Text>
                
                <ul className={`${styles.skillsList} mb-4`}>
                  <li className="mb-2">Sistema de login seguro</li>
                  <li className="mb-2">Proteção de rotas</li>
                  <li className="mb-2">Estrutura que permite fácil expansão</li>
                  <li className="mb-2">Código organizado e legível</li>
                </ul>
                
                <Card.Text className="font-italic">
                  <strong>Para ser transparente:</strong> Este é um projeto de estudo, não uso comercial. 
                  A interface se inspira no Spotify, mas todo o código foi desenvolvido por mim, 
                  como forma de demonstrar minhas capacidades técnicas.
                </Card.Text>
                
                <Card.Text>
                  Se tivesse mais tempo, eu queria muito fazer o player funcional... infelizmente o tempo e outras demandas acabaram afetando. 
                  Mas acredito que mesmo assim consegui criar algo que mostra minha forma de trabalhar 
                  e resolver problemas.
                </Card.Text>
              </Card.Body>
            </Card>

            <div className={`${styles.buttonsContainer} mt-5`}>
              <Link href="/home" passHref>
                <Button variant="success" size="lg" className={`${styles.actionButton} me-3`}>
                  Voltar para Home
                </Button>
              </Link>
              <Link href="/songs" passHref>
                <Button variant="outline-light" size="lg" className={styles.actionButton}>
                  Explorar Músicas
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      </ProtectedRoute>
    </MainLayout>
  );
};

export default About;