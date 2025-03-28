import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/songs');
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Erro ao buscar músicas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [isMounted]);

  if (!isMounted) {
    return null; 
  }

  return (
    <MainLayout title="Músicas - Spotify Clone">
      <Container>
        <h1 className="text-center mb-4">Músicas Disponíveis</h1>
        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : (
          <Row>
            {songs.length > 0 ? (
              songs.map((song) => (
                <Col key={song.id} md={4} className="mb-4">
                  <Card>
                    <Card.Img variant="top" src={song.cover || '/default-cover.jpg'} />
                    <Card.Body>
                      <Card.Title>{song.title}</Card.Title>
                      <Card.Text>
                        <strong>Artista:</strong> {song.artist}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">Nenhuma música encontrada.</p>
            )}
          </Row>
        )}
      </Container>
    </MainLayout>
  );
};

export default Songs;
