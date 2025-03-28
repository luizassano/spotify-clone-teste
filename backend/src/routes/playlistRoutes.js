const express = require('express');
const { 
    createPlaylist, 
    getAllPlaylists, 
    getPlaylistById, 
    addSongToPlaylist,
    getPlaylistSongs,
    updatePlaylist,
    deletePlaylist,
    removeSongFromPlaylist
  } = require('../controllers/playlistController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: Gerenciamento de playlists
 */

/**
 * @swagger
 * /api/playlists:
 *   post:
 *     summary: Cria uma nova playlist
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - userId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Minhas Favoritas"
 *               userId:
 *                 type: integer
 *                 example: 1
 *               description:
 *                 type: string
 *                 example: "Minhas músicas favoritas de todos os tempos"
 *     responses:
 *       201:
 *         description: Playlist criada com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar playlist
 */
router.post('/', createPlaylist);

/**
 * @swagger
 * /api/playlists:
 *   get:
 *     summary: Retorna todas as playlists
 *     tags: [Playlists]
 *     responses:
 *       200:
 *         description: Lista de playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 *       500:
 *         description: Erro ao buscar playlists
 */
router.get('/', getAllPlaylists);

/**
 * @swagger
 * /api/playlists/{id}:
 *   get:
 *     summary: Retorna uma playlist pelo ID
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Retorna os detalhes da playlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: Playlist não encontrada
 *       500:
 *         description: Erro ao buscar playlist
 */
router.get('/:id', getPlaylistById);

/**
 * @swagger
 * /api/playlists/{id}:
 *   put:
 *     summary: Atualiza uma playlist existente
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Novo nome da playlist"
 *               description:
 *                 type: string
 *                 example: "Nova descrição"
 *     responses:
 *       200:
 *         description: Playlist atualizada com sucesso
 *       404:
 *         description: Playlist não encontrada
 *       500:
 *         description: Erro ao atualizar playlist
 */
router.put('/:id', updatePlaylist);

/**
 * @swagger
 * /api/playlists/{id}:
 *   delete:
 *     summary: Remove uma playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Playlist removida com sucesso
 *       404:
 *         description: Playlist não encontrada
 *       500:
 *         description: Erro ao remover playlist
 */
router.delete('/:id', deletePlaylist);

/**
 * @swagger
 * /api/playlists/{id}/songs:
 *   get:
 *     summary: Retorna todas as músicas de uma playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de músicas da playlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       404:
 *         description: Playlist não encontrada
 *       500:
 *         description: Erro ao buscar músicas da playlist
 */
router.get('/:id/songs', getPlaylistSongs);

/**
 * @swagger
 * /api/playlists/{id}/songs:
 *   post:
 *     summary: Adiciona uma música à playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - songId
 *             properties:
 *               songId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Música adicionada à playlist com sucesso!
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Playlist ou música não encontrada
 *       500:
 *         description: Erro ao adicionar música à playlist
 */
router.post('/:id/songs', addSongToPlaylist);

/**
 * @swagger
 * /api/playlists/{playlistId}/songs/{songId}:
 *   delete:
 *     summary: Remove uma música da playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Música removida da playlist com sucesso
 *       404:
 *         description: Playlist ou música não encontrada
 *       500:
 *         description: Erro ao remover música da playlist
 */
router.delete('/:playlistId/songs/:songId', removeSongFromPlaylist);

/**
 * @swagger
 * components:
 *   schemas:
 *     Playlist:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         user_id:
 *           type: integer
 *         description:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         song_count:
 *           type: integer
 *     Song:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         artist:
 *           type: string
 *         album:
 *           type: string
 *         duration:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 */

module.exports = router;