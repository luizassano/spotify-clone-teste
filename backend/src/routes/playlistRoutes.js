const express = require('express');
const { createPlaylist, getAllPlaylists, getPlaylistById, addSongToPlaylist } = require('../controllers/playlistController');

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
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Minhas Favoritas"
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Playlist criada com sucesso!
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
 *       404:
 *         description: Playlist não encontrada
 *       500:
 *         description: Erro ao buscar playlist
 */
router.get('/:id', getPlaylistById);

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
 *             properties:
 *               songId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Música adicionada à playlist com sucesso!
 *       404:
 *         description: Playlist ou música não encontrada
 *       500:
 *         description: Erro ao adicionar música à playlist
 */
router.post('/:id/songs', addSongToPlaylist);

module.exports = router;
