import MainLayout from "../layouts/MainLayout";
import {
  Container,
  Button,
  Image,
  Card,
  Row,
  Col,
  Form,
  ListGroup,
  Modal,
} from "react-bootstrap";
import Link from "next/link";
import ProtectedRoute from "../components/ProtectedRoute";
import { useState, useEffect } from "react";
import { MusicService } from "../services/MusicService";
import { PlaylistService } from "../services/PlaylistService";
import styles from "../styles/songs.module.css";
import { AuthService } from "../services/authService";

const Songs = () => {
  const [isClient, setIsClient] = useState(false);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const [showAddPlaylistModal, setShowAddPlaylistModal] = useState(false);
  const [showEditSongModal, setShowEditSongModal] = useState(false);
  const [showEditPlaylistModal, setShowEditPlaylistModal] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "0:00",
  });
  const [editingSong, setEditingSong] = useState(null);
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    description: "",
    userId: null,
  });
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPlaylistSongsModal, setShowPlaylistSongsModal] = useState(false);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ type: null, id: null });

  useEffect(() => {
    setIsClient(true);

    const loadData = async () => {
      if (typeof window === 'undefined') return;
      
      setLoading(true);
      setError(null);
      try {
        await Promise.all([fetchSongs(), fetchPlaylists()]);
      } catch (error) {
        console.error("Erro geral ao carregar:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const fetchSongs = async () => {
    try {
      const result = await MusicService.getAllSongs();
      setSongs(result);
    } catch (err) {
      console.error("Erro completo:", err);
      setError(err.message);
      setSongs([]);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const result = await PlaylistService.getAllPlaylists();
      setPlaylists(result);
    } catch (err) {
      console.error("Erro completo:", err);
      setError(err.message);
      setPlaylists([]);
    }
  };

  const handleAddSong = async () => {
    try {
      if (!newSong.title || !newSong.artist || !newSong.duration) {
        throw new Error("Preencha título, artista e duração");
      }

      await MusicService.createSong({
        title: newSong.title,
        artist: newSong.artist,
        album: newSong.album || null,
        duration: newSong.duration,
      });

      setShowAddSongModal(false);
      setNewSong({ title: "", artist: "", album: "", duration: "0:00" });
      await fetchSongs();
      setError(null);
    } catch (err) {
      console.error("Erro ao adicionar música:", err);
      setError(err.message);
    }
  };

  const handleEditSong = async () => {
    try {
      if (!editingSong.title || !editingSong.artist || !editingSong.duration) {
        throw new Error("Preencha título, artista e duração");
      }

      await MusicService.updateSong(editingSong.id, {
        title: editingSong.title,
        artist: editingSong.artist,
        album: editingSong.album || null,
        duration: editingSong.duration,
      });

      setShowEditSongModal(false);
      await fetchSongs();
      setError(null);
    } catch (err) {
      console.error("Erro ao editar música:", err);
      setError(err.message);
    }
  };

  const handleDeleteSong = async (songId) => {
    try {
      await MusicService.deleteSong(songId);
      await fetchSongs();
      setShowDeleteConfirmation(false);
      setError(null);
    } catch (err) {
      console.error("Erro ao excluir música:", err);
      setError(err.message);
    }
  };

  const handleAddPlaylist = async () => {
    try {
      if (!newPlaylist.name) {
        throw new Error("Nome da playlist é obrigatório");
      }

      if (!AuthService.isAuthenticated()) {
        throw new Error("Por favor, faça login para criar playlists");
      }

      const userId = AuthService.getCurrentUserId();
      console.log("User ID:", userId);

      if (!userId) {
        throw new Error("ID do usuário não encontrado");
      }

      const response = await PlaylistService.createPlaylist({
        name: newPlaylist.name,
        description: newPlaylist.description,
        userId: userId,
      });

      console.log("Playlist criada:", response);

      setShowAddPlaylistModal(false);
      setNewPlaylist({ name: "", description: "", userId: null });
      await fetchPlaylists();
      setError(null);
    } catch (err) {
      console.error("Erro ao criar playlist:", err);
      setError(err.message);
    }
  };

  const handleEditPlaylist = async () => {
    try {
      if (!editingPlaylist.name) {
        throw new Error("Nome da playlist é obrigatório");
      }

      await PlaylistService.updatePlaylist(editingPlaylist.id, {
        name: editingPlaylist.name,
        description: editingPlaylist.description,
      });

      setShowEditPlaylistModal(false);
      await fetchPlaylists();
      setError(null);
    } catch (err) {
      console.error("Erro ao editar playlist:", err);
      setError(err.message);
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await PlaylistService.deletePlaylist(playlistId);
      await fetchPlaylists();
      setShowDeleteConfirmation(false);
      setError(null);
    } catch (err) {
      console.error("Erro ao excluir playlist:", err);
      setError(err.message);
    }
  };

  const handleAddSongToPlaylist = async () => {
    if (!selectedPlaylist || !selectedSong) return;

    try {
      await PlaylistService.addSongToPlaylist(
        selectedPlaylist.id,
        selectedSong.id
      );

      setSelectedPlaylist(null);
      setSelectedSong(null);
      await fetchPlaylists();
      setError(null);
    } catch (err) {
      console.error("Erro ao adicionar música à playlist:", err);
      setError(err.message);
    }
  };

  const handleShowPlaylistSongs = async (playlistId) => {
    try {
      const songs = await PlaylistService.getPlaylistSongs(playlistId);
      setPlaylistSongs(songs);
      setShowPlaylistSongsModal(true);
    } catch (err) {
      console.error("Erro ao buscar músicas da playlist:", err);
      setError(err.message);
    }
  };

  const handleRemoveSongFromPlaylist = async (playlistId, songId) => {
    try {
      await PlaylistService.removeSongFromPlaylist(playlistId, songId);
      await fetchPlaylists();
      setPlaylistSongs(playlistSongs.filter((song) => song.id !== songId));
      setError(null);
    } catch (err) {
      console.error("Erro ao remover música da playlist:", err);
      setError(err.message);
    }
  };

  const openEditSongModal = (song) => {
    setEditingSong({ ...song });
    setShowEditSongModal(true);
  };

  const openEditPlaylistModal = (playlist) => {
    setEditingPlaylist({ ...playlist });
    setShowEditPlaylistModal(true);
  };

  const confirmDelete = (type, id) => {
    setItemToDelete({ type, id });
    setShowDeleteConfirmation(true);
  };

  const executeDelete = () => {
    if (itemToDelete.type === 'song') {
      handleDeleteSong(itemToDelete.id);
    } else if (itemToDelete.type === 'playlist') {
      handleDeletePlaylist(itemToDelete.id);
    }
  };

  if (!isClient) {
    return (
      <MainLayout title="Carregando... - Spotify Clone">
        <ProtectedRoute>
          <div className={styles.container}>
            <Container className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </Container>
          </div>
        </ProtectedRoute>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Músicas - Spotify Clone">
      <ProtectedRoute>
        <div className={styles.container}>
          <Container>
            <div className="text-center mb-5">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
                alt="Spotify Logo"
                className={styles.logo}
                fluid
              />
              <h1 className={`${styles.title} mt-4 mb-4`}>Minha Biblioteca</h1>

              {error && <div className="alert alert-danger">{error}</div>}
            </div>

            <Row>
              <Col md={6}>
                <Card className={`${styles.musicCard} shadow-lg mb-4`}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Card.Title>Músicas</Card.Title>
                      <Button
                        variant="success"
                        onClick={() => setShowAddSongModal(true)}
                        className={styles.actionButton}
                      >
                        Adicionar Música
                      </Button>
                    </div>

                    <ListGroup>
                      {songs?.map((song) => (
                        <ListGroup.Item
                          key={song.id}
                          className={`${styles.songItem} d-flex justify-content-between align-items-center`}
                          active={selectedSong?.id === song.id}
                          onClick={() => setSelectedSong(song)}
                        >
                          <div>
                            <strong>{song.title}</strong>
                            <div className="text-muted">
                              {song.artist} • {song.album} • {song.duration}
                            </div>
                          </div>
                          <div>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditSongModal(song);
                              }}
                              className="me-2"
                            >
                              Editar
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                confirmDelete('song', song.id);
                              }}
                              className="me-2"
                            >
                              Excluir
                            </Button>
                            <Button variant="outline-light" size="sm">
                              ▶️
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className={`${styles.musicCard} shadow-lg mb-4`}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Card.Title>Playlists</Card.Title>
                      <Button
                        variant="success"
                        onClick={() => setShowAddPlaylistModal(true)}
                        className={styles.actionButton}
                      >
                        Criar Playlist
                      </Button>
                    </div>

                    <ListGroup>
                      {playlists?.map((playlist) => (
                        <ListGroup.Item
                          key={playlist.id}
                          className={`${styles.playlistItem} d-flex justify-content-between align-items-center`}
                          active={selectedPlaylist?.id === playlist.id}
                          onClick={() => setSelectedPlaylist(playlist)}
                        >
                          <div>
                            <strong>{playlist.name}</strong>
                            <div className="text-muted">
                              {playlist.songs?.length || 0} músicas •{" "}
                              {playlist.description}
                            </div>
                          </div>
                          <div>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditPlaylistModal(playlist);
                              }}
                              className="me-2"
                            >
                              Editar
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                confirmDelete('playlist', playlist.id);
                              }}
                              className="me-2"
                            >
                              Excluir
                            </Button>
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShowPlaylistSongs(playlist.id);
                              }}
                              className="me-2"
                            >
                              👁️
                            </Button>
                            <Button variant="outline-light" size="sm">
                              🔀
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {selectedSong && selectedPlaylist && (
              <div className="text-center mt-4">
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleAddSongToPlaylist}
                  className={styles.actionButton}
                >
                  Adicionar "{selectedSong.title}" a "{selectedPlaylist.name}"
                </Button>
              </div>
            )}

            <div className={`${styles.buttonsContainer} mt-5`}>
              <Link href="/home" passHref>
                <Button
                  variant="success"
                  size="lg"
                  className={`${styles.actionButton} me-3`}
                >
                  Voltar para Home
                </Button>
              </Link>
              <Link href="/about" passHref>
                <Button
                  variant="outline-light"
                  size="lg"
                  className={styles.actionButton}
                >
                  Sobre o Projeto
                </Button>
              </Link>
            </div>
          </Container>

          {/* Modal para adicionar música */}
          <Modal
            show={showAddSongModal}
            onHide={() => setShowAddSongModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Adicionar Nova Música</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Título *</Form.Label>
                  <Form.Control
                    type="text"
                    value={newSong.title}
                    onChange={(e) =>
                      setNewSong({ ...newSong, title: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Artista *</Form.Label>
                  <Form.Control
                    type="text"
                    value={newSong.artist}
                    onChange={(e) =>
                      setNewSong({ ...newSong, artist: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Álbum</Form.Label>
                  <Form.Control
                    type="text"
                    value={newSong.album}
                    onChange={(e) =>
                      setNewSong({ ...newSong, album: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Duração (mm:ss) *</Form.Label>
                  <Form.Control
                    type="text"
                    value={newSong.duration}
                    onChange={(e) =>
                      setNewSong({ ...newSong, duration: e.target.value })
                    }
                    placeholder="3:45"
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowAddSongModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="success" onClick={handleAddSong}>
                Adicionar Música
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal para editar música */}
          <Modal
            show={showEditSongModal}
            onHide={() => setShowEditSongModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Editar Música</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Título *</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingSong?.title || ''}
                    onChange={(e) =>
                      setEditingSong({ ...editingSong, title: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Artista *</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingSong?.artist || ''}
                    onChange={(e) =>
                      setEditingSong({ ...editingSong, artist: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Álbum</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingSong?.album || ''}
                    onChange={(e) =>
                      setEditingSong({ ...editingSong, album: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Duração (mm:ss) *</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingSong?.duration || ''}
                    onChange={(e) =>
                      setEditingSong({ ...editingSong, duration: e.target.value })
                    }
                    placeholder="3:45"
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditSongModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="success" onClick={handleEditSong}>
                Salvar Alterações
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal para adicionar playlist */}
          <Modal
            show={showAddPlaylistModal}
            onHide={() => setShowAddPlaylistModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Criar Nova Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nome *</Form.Label>
                  <Form.Control
                    type="text"
                    value={newPlaylist.name}
                    onChange={(e) =>
                      setNewPlaylist({ ...newPlaylist, name: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newPlaylist.description}
                    onChange={(e) =>
                      setNewPlaylist({
                        ...newPlaylist,
                        description: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowAddPlaylistModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="success" onClick={handleAddPlaylist}>
                Criar Playlist
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal para editar playlist */}
          <Modal
            show={showEditPlaylistModal}
            onHide={() => setShowEditPlaylistModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Editar Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nome *</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingPlaylist?.name || ''}
                    onChange={(e) =>
                      setEditingPlaylist({ ...editingPlaylist, name: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editingPlaylist?.description || ''}
                    onChange={(e) =>
                      setEditingPlaylist({
                        ...editingPlaylist,
                        description: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditPlaylistModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="success" onClick={handleEditPlaylist}>
                Salvar Alterações
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal para visualizar músicas da playlist */}
          <Modal
            show={showPlaylistSongsModal}
            onHide={() => setShowPlaylistSongsModal(false)}
            centered
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Músicas da Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {playlistSongs.length > 0 ? (
                <ListGroup>
                  {playlistSongs.map((song) => (
                    <ListGroup.Item
                      key={song.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{song.title}</strong>
                        <div className="text-muted">
                          {song.artist} • {song.album} • {song.duration}
                        </div>
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() =>
                          handleRemoveSongFromPlaylist(
                            selectedPlaylist.id,
                            song.id
                          )
                        }
                      >
                        Remover
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>Esta playlist não contém músicas ainda.</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowPlaylistSongsModal(false)}
              >
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal de confirmação para exclusão */}
          <Modal
            show={showDeleteConfirmation}
            onHide={() => setShowDeleteConfirmation(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {itemToDelete.type === 'song' ? (
                <p>Tem certeza que deseja excluir esta música? Esta ação não pode ser desfeita.</p>
              ) : (
                <p>Tem certeza que deseja excluir esta playlist? Todas as músicas associadas serão removidas. Esta ação não pode ser desfeita.</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancelar
              </Button>
              <Button variant="danger" onClick={executeDelete}>
                Confirmar Exclusão
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </ProtectedRoute>
    </MainLayout>
  );
};

export default Songs;