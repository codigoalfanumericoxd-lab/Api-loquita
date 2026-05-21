import express from 'express';
const router = express.Router();
import authorsController from '../controllers/authorsController.js';

// GET /authors - Listar todos los autores
router.get('/', authorsController.getAllAuthors);

// GET /authors/:id - Obtener un autor por ID
router.get('/:id', authorsController.getAuthorById);

// POST /authors - Crear un autor
router.post('/', authorsController.createAuthor);

// PUT /authors/:id - Actualizar un autor
router.put('/:id', authorsController.updateAuthor);

// DELETE /authors/:id - Eliminar un autor
router.delete('/:id', authorsController.deleteAuthor);

export default router;