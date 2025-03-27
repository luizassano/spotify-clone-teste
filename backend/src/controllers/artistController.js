const Artist = require('../models/artistModel');

exports.createArtist = async (req, res) => {
  try {
    const { name, genre } = req.body;
    await Artist.createArtist(name, genre);
    res.status(201).json({ message: 'Artista criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar artista', error });
  }
};

exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.getAllArtists();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar artistas', error });
  }
};

exports.getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.getArtistById(id);
    if (!artist) return res.status(404).json({ message: 'Artista não encontrado' });
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar artista', error });
  }
};
