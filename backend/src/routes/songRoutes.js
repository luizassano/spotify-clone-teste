const express = require('express');
const { 
  createSong, 
  getAllSongs, 
  getSongById,
  updateSong,
  deleteSong
} = require('../controllers/songController');

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
 *               artist:
 *                 type: string
 *                 example: "Coldplay"
 *               album:
 *                 type: string
 *                 example: "Parachutes"
 *               duration:
 *                 type: string
 *                 example: "4:29"
 *     responses:
 *       201:
 *         description: Música criada com sucesso!
 *       400:
 *         description: Campos obrigatórios faltando
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

/**
 * @swagger
 * /api/songs/{id}:
 *   put:
 *     summary: Atualiza uma música existente
 *     tags: [Songs]
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
 *               title:
 *                 type: string
 *                 example: "Yellow (Updated)"
 *               artist:
 *                 type: string
 *                 example: "Coldplay"
 *               album:
 *                 type: string
 *                 example: "Parachutes Deluxe"
 *               duration:
 *                 type: string
 *                 example: "4:35"
 *     responses:
 *       200:
 *         description: Música atualizada com sucesso
 *       400:
 *         description: Campos obrigatórios faltando
 *       404:
 *         description: Música não encontrada
 *       500:
 *         description: Erro ao atualizar música
 */
router.put('/:id', updateSong);

/**
 * @swagger
 * /api/songs/{id}:
 *   delete:
 *     summary: Remove uma música
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
 *         description: Música deletada com sucesso
 *       404:
 *         description: Música não encontrada
 *       500:
 *         description: Erro ao deletar música
 */
router.delete('/:id', deleteSong);

module.exports = router;