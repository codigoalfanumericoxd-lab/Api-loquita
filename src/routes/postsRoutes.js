import express from 'express';
const router = express.Router();
import postsController from '../controllers/postsController.js';

// GET /posts/author/:authorId - DEBE IR ANTES de /posts/:id
router.get('/author/:authorId', postsController.getPostsByAuthor);

// GET /posts - Listar todos los posts
router.get('/', postsController.getAllPosts);

// GET /posts/:id - Obtener un post por ID
router.get('/:id', postsController.getPostById);

// POST /posts - Crear un post
router.post('/', postsController.createPost);

// PUT /posts/:id - Actualizar un post
router.put('/:id', postsController.updatePost);

// DELETE /posts/:id - Eliminar un post
router.delete('/:id', postsController.deletePost);

export default router;