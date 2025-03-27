const express = require('express');
const { createSong, getAllSongs, getSongById } = require('../controllers/songController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: Gerenciamento de músicas
 */

/**
 * @swagger
 * /api/songs:
 *   post:
 *     summary: Cria uma nova música
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Yellow"
 *               artistId:
 *                 type: integer
 *                 example: 1
 *               albumId:
 *                 type: integer
 *                 example: 2
 *               duration:
 *                 type: string
 *                 example: "4:29"
 *     responses:
 *       201:
 *         description: Música criada com sucesso!
 *       500:
 *         description: Erro ao criar música
 */
router.post('/', createSong);

/**
 * @swagger
 * /api/songs:
 *   get:
 *     summary: Retorna todas as músicas
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: Lista de músicas
 *       500:
 *         description: Erro ao buscar músicas
 */
router.get('/', getAllSongs);

/**
 * @swagger
 * /api/songs/{id}:
 *   get:
 *     summary: Retorna uma música pelo ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Retorna os detalhes da música
 *       404:
 *         description: Música não encontrada
 *       500:
 *         description: Erro ao buscar música
 */
router.get('/:id', getSongById);

module.exports = router;
