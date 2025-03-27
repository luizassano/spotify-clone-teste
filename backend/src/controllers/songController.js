const Song = require('../models/songModel');

exports.createSong = async (req, res) => {
  try {
    const { title, artistId, albumId, duration } = req.body;
    
    await Song.createSong(title, artistId, albumId, duration);
    
    res.status(201).json({ message: 'Música criada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar música', error });
  }
};

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.getAllSongs();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar músicas', error });
  }
};

exports.getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.getSongById(id);
    
    if (!song) {
      return res.status(404).json({ message: 'Música não encontrada' });
    }
    
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar música', error });
  }
};
