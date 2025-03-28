const PlaylistModel = require("../models/playlistModel");

exports.createPlaylist = async (req, res) => {
  try {
    const { name, userId, description } = req.body;

    if (!name || !userId) {
      return res
        .status(400)
        .json({ message: "Nome e userId são obrigatórios" });
    }

    const playlist = await PlaylistModel.createPlaylist({
      name,
      userId,
      description,
    });
    res.status(201).json(playlist);
  } catch (error) {
    console.error("Erro ao criar playlist:", error);
    res
      .status(500)
      .json({ message: "Erro ao criar playlist", error: error.message });
  }
};

exports.getAllPlaylists = async (req, res) => {
  try {
    const playlists = await PlaylistModel.getAllPlaylists();
    res.json(playlists);
  } catch (error) {
    console.error("Erro ao buscar playlists:", error);
    res
      .status(500)
      .json({ message: "Erro ao buscar playlists", error: error.message });
  }
};

exports.getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await PlaylistModel.getPlaylistById(id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist não encontrada" });
    }
    res.json(playlist);
  } catch (error) {
    console.error("Erro ao buscar playlist:", error);
    res
      .status(500)
      .json({ message: "Erro ao buscar playlist", error: error.message });
  }
};

exports.updatePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedPlaylist = await PlaylistModel.updatePlaylist(id, {
      name,
      description,
    });
    if (!updatedPlaylist) {
      return res.status(404).json({ message: "Playlist não encontrada" });
    }
    res.json(updatedPlaylist);
  } catch (error) {
    console.error("Erro ao atualizar playlist:", error);
    res
      .status(500)
      .json({ message: "Erro ao atualizar playlist", error: error.message });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PlaylistModel.deletePlaylist(id);
    if (!deleted) {
      return res.status(404).json({ message: "Playlist não encontrada" });
    }
    res.json({ message: "Playlist removida com sucesso" });
  } catch (error) {
    console.error("Erro ao remover playlist:", error);
    res
      .status(500)
      .json({ message: "Erro ao remover playlist", error: error.message });
  }
};

exports.addSongToPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({ message: "songId é obrigatório" });
    }

    await PlaylistModel.addSongToPlaylist(id, songId);
    res.json({ message: "Música adicionada à playlist com sucesso" });
  } catch (error) {
    console.error("Erro ao adicionar música à playlist:", error);
    res.status(500).json({
      message: "Erro ao adicionar música à playlist",
      error: error.message,
    });
  }
};

exports.getPlaylistSongs = async (req, res) => {
  try {
    const { id } = req.params;
    const songs = await PlaylistModel.getPlaylistSongs(id);
    res.json(songs);
  } catch (error) {
    console.error("Erro ao buscar músicas da playlist:", error);
    res.status(500).json({
      message: "Erro ao buscar músicas da playlist",
      error: error.message,
    });
  }
};

exports.removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    const removed = await PlaylistModel.removeSongFromPlaylist(
      playlistId,
      songId
    );
    if (!removed) {
      return res
        .status(404)
        .json({ message: "Música ou playlist não encontrada" });
    }
    res.json({ message: "Música removida da playlist com sucesso" });
  } catch (error) {
    console.error("Erro ao remover música da playlist:", error);
    res.status(500).json({
      message: "Erro ao remover música da playlist",
      error: error.message,
    });
  }
};
