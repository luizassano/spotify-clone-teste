const Playlist = require('../models/playlistModel');

exports.createPlaylist = async (req, res) => {
  try {
    const { name, userId } = req.body;
    
    await Playlist.createPlaylist(name, userId);
    
    res.status(201).json({ message: 'Playlist criada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar playlist', error });
  }
};

exports.getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.getAllPlaylists();
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar playlists', error });
  }
};

exports.getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.getPlaylistById(id);
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }
    
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar playlist', error });
  }
};

exports.addSongToPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { songId } = req.body;

    const success = await Playlist.addSongToPlaylist(id, songId);
    if (!success) {
      return res.status(404).json({ message: 'Playlist ou música não encontrada' });
    }

    res.json({ message: 'Música adicionada à playlist com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar música à playlist', error });
  }
};
