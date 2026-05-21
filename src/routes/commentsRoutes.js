import express from 'express';
const router = express.Router();
import commentsController from '../controllers/commentsController.js';

// Rutas específicas primero (antes de /:id)
router.get('/post/:postId', commentsController.getCommentsByPost);
router.get('/author/:authorId', commentsController.getCommentsByAuthor);

// Rutas generales
router.get('/', commentsController.getAllComments);
router.get('/:id', commentsController.getCommentById);
router.post('/', commentsController.createComment);
router.put('/:id', commentsController.updateComment);
router.delete('/:id', commentsController.deleteComment);

export default router;