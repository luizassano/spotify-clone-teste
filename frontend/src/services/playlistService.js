import api from "./api";

export const PlaylistService = {
  async createPlaylist(playlistData) {
    try {
      const response = await api.post("/playlists", playlistData);
      return response.data;
    } catch (error) {
      console.error("[PlaylistService] Erro ao criar playlist:", error);
      throw new Error(
        error.response?.data?.message || "Erro ao criar playlist"
      );
    }
  },

  async getAllPlaylists() {
    try {
      const { data } = await api.get("/playlists");
      console.log("Dados retornados pelo serviço:", data);
      return data || [];
    } catch (error) {
      console.error("Erro detalhado:", {
        config: error.config,
        response: error.response,
        message: error.message,
      });
      throw error;
    }
  },

  async getPlaylistById(id) {
    try {
      const response = await api.get(`/playlists/${id}`);
      return response.data;
    } catch (error) {
      console.error("[PlaylistService] Erro ao buscar playlist:", error);
      throw new Error(
        error.response?.data?.message || "Erro ao buscar playlist"
      );
    }
  },

  async updatePlaylist(id, updateData) {
    try {
      const response = await api.put(`/playlists/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error("[PlaylistService] Erro ao atualizar playlist:", error);
      throw new Error(
        error.response?.data?.message || "Erro ao atualizar playlist"
      );
    }
  },

  async deletePlaylist(id) {
    try {
      const response = await api.delete(`/playlists/${id}`);
      return response.data;
    } catch (error) {
      console.error("[PlaylistService] Erro ao remover playlist:", error);
      throw new Error(
        error.response?.data?.message || "Erro ao remover playlist"
      );
    }
  },

  async addSongToPlaylist(playlistId, songId) {
    try {
      const response = await api.post(`/playlists/${playlistId}/songs`, {
        songId,
      });
      return response.data;
    } catch (error) {
      console.error("[PlaylistService] Erro ao adicionar música:", error);
      throw new Error(
        error.response?.data?.message || "Erro ao adicionar música à playlist"
      );
    }
  },

  async getPlaylistSongs(playlistId) {
    try {
      const response = await api.get(`/playlists/${playlistId}/songs`);
      return response.data;
    } catch (error) {
      console.error(
        "[PlaylistService] Erro ao buscar músicas da playlist:",
        error
      );
      throw new Error(
        error.response?.data?.message || "Erro ao buscar músicas da playlist"
      );
    }
  },

  async removeSongFromPlaylist(playlistId, songId) {
    try {
      const response = await api.delete(
        `/playlists/${playlistId}/songs/${songId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "[PlaylistService] Erro ao remover música da playlist:",
        error
      );
      throw new Error(
        error.response?.data?.message || "Erro ao remover música da playlist"
      );
    }
  },

  async searchPlaylists(query) {
    try {
      const response = await api.get("/playlists/search", {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error("[PlaylistService] Erro ao buscar playlists:", error);
      throw new Error(
        error.response?.data?.message || "Erro ao buscar playlists"
      );
    }
  },
};
