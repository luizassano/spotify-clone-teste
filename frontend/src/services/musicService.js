import api from "./api";

export const MusicService = {
  async getAllSongs() {
    try {
      const response = await api.get("/songs");
      return response.data;
    } catch (error) {
      console.error('[MusicService] Erro ao buscar músicas:', error);
      throw new Error(error.response?.data?.message || "Erro ao carregar músicas");
    }
  },

  async getSongById(id) {
    try {
      const response = await api.get(`/songs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`[MusicService] Erro ao buscar música com ID ${id}:`, error);
      if (error.response?.status === 404) {
        throw new Error("Música não encontrada");
      }
      throw new Error(error.response?.data?.message || "Erro ao buscar música");
    }
  },

  async createSong(songData) {
    try {
      const response = await api.post("/songs", {
        title: songData.title,
        artist: songData.artist,       
        album: songData.album,         
        duration: songData.duration
      });
      return response.data;
    } catch (error) {
      console.error('[MusicService] Erro ao criar música:', error);
      throw new Error(error.response?.data?.message || "Erro ao criar música");
    }
  },

  async updateSong(id, songData) {
    try {
      const response = await api.put(`/songs/${id}`, {
        title: songData.title,
        artist: songData.artist,      
        album: songData.album,        
        duration: songData.duration
      });
      return response.data;
    } catch (error) {
      console.error(`[MusicService] Erro ao atualizar música com ID ${id}:`, error);
      if (error.response?.status === 404) {
        throw new Error("Música não encontrada");
      }
      throw new Error(error.response?.data?.message || "Erro ao atualizar música");
    }
  },

  async deleteSong(id) {
    try {
      const response = await api.delete(`/songs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`[MusicService] Erro ao deletar música com ID ${id}:`, error);
      if (error.response?.status === 404) {
        throw new Error("Música não encontrada");
      }
      throw new Error(error.response?.data?.message || "Erro ao deletar música");
    }
  },

  async searchSongs(query) {
    try {
      const response = await api.get("/songs/search", {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('[MusicService] Erro ao buscar músicas:', error);
      throw new Error(error.response?.data?.message || "Erro ao buscar músicas");
    }
  }
};