const SongModel = require("../models/songModel");

exports.createSong = async (req, res) => {
  try {
    const { title, artist, album, duration } = req.body;

    if (!title || !artist || !duration) {
      return res.status(400).json({
        message: "Título, artista e duração são obrigatórios",
      });
    }

    const song = await SongModel.createSong({
      title,
      artist,
      album: album || null,
      duration,
    });

    res.status(201).json(song);
  } catch (error) {
    console.error("Erro ao criar música:", error);
    res.status(500).json({
      message: "Erro ao criar música",
      error: error.message,
    });
  }
};

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await SongModel.getAllSongs();
    res.json(songs);
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    res.status(500).json({
      message: "Erro ao buscar músicas",
      error: error.message,
    });
  }
};

exports.getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await SongModel.getSongById(id);

    if (!song) {
      return res.status(404).json({ message: "Música não encontrada" });
    }

    res.json(song);
  } catch (error) {
    console.error("Erro ao buscar música:", error);
    res.status(500).json({
      message: "Erro ao buscar música",
      error: error.message,
    });
  }
};
