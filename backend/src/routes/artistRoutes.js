const express = require('express');
const { createArtist, getAllArtists, getArtistById } = require('../controllers/artistController');

const router = express.Router();

/**
 * @swagger
 * /api/artists:
 *   post:
 *     summary: Cria um novo artista
 *     tags: [Artists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Coldplay"
 *               genre:
 *                 type: string
 *                 example: "Rock"
 *     responses:
 *       201:
 *         description: Artista criado com sucesso!
 *       500:
 *         description: Erro ao criar artista
 */
router.post('/', createArtist);

/**
 * @swagger
 * /api/artists:
 *   get:
 *     summary: Retorna todos os artistas
 *     tags: [Artists]
 *     responses:
 *       200:
 *         description: Lista de artistas
 *       500:
 *         description: Erro ao buscar artistas
 */
router.get('/', getAllArtists);

/**
 * @swagger
 * /api/artists/{id}:
 *   get:
 *     summary: Retorna um artista pelo ID
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Retorna os detalhes do artista
 *       404:
 *         description: Artista não encontrado
 *       500:
 *         description: Erro ao buscar artista
 */
router.get('/:id', getArtistById);

module.exports = router;
