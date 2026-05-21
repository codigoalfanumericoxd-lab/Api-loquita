import commentsService from '../services/commentsService.js';

const commentsController = {
  // GET /comments
  async getAllComments(req, res, next) {
    try {
      const comments = await commentsService.getAllComments();
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  },

  // GET /comments/:id
  async getCommentById(req, res, next) {
    try {
      const { id } = req.params;
      const comment = await commentsService.getCommentById(id);
      
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  },

  // GET /comments/post/:postId
  async getCommentsByPost(req, res, next) {
    try {
      const { postId } = req.params;
      const comments = await commentsService.getCommentsByPost(postId);
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  },

  // GET /comments/author/:authorId
  async getCommentsByAuthor(req, res, next) {
    try {
      const { authorId } = req.params;
      const comments = await commentsService.getCommentsByAuthor(authorId);
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  },

  // POST /comments
  async createComment(req, res, next) {
    try {
      const { post_id, author_id, content } = req.body;
      
      // Validaciones
      if (!post_id || !author_id || !content) {
        return res.status(400).json({ 
          error: 'post_id, author_id, and content are required' 
        });
      }
      
      const comment = await commentsService.createComment(
        post_id,
        author_id,
        content
      );
      
      res.status(201).json(comment);
    } catch (error) {
      // Error de foreign key (post o author no existe)
      if (error.code === '23503') {
        return res.status(400).json({ 
          error: 'Post or Author does not exist' 
        });
      }
      next(error);
    }
  },

  // PUT /comments/:id
  async updateComment(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      
      // Validaciones
      if (!content) {
        return res.status(400).json({ 
          error: 'Content is required' 
        });
      }
      
      const comment = await commentsService.updateComment(id, content);
      
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  },

  // DELETE /comments/:id
  async deleteComment(req, res, next) {
    try {
      const { id } = req.params;
      const comment = await commentsService.deleteComment(id);
      
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

export default commentsController;