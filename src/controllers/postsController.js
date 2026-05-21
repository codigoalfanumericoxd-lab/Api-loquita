import postsService from '../services/postsService.js';

const postsController = {
  // GET /posts
  async getAllPosts(req, res, next) {
    try {
      const posts = await postsService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  },

  // GET /posts/:id
  async getPostById(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postsService.getPostById(id);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },

  // GET /posts/author/:authorId
  async getPostsByAuthor(req, res, next) {
    try {
      const { authorId } = req.params;
      const posts = await postsService.getPostsByAuthor(authorId);
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  },

  // POST /posts
  async createPost(req, res, next) {
    try {
      const { title, content, author_id, published } = req.body;
      
      // Validaciones
      if (!title || !content || !author_id) {
        return res.status(400).json({ 
          error: 'Title, content, and author_id are required' 
        });
      }
      
      const post = await postsService.createPost(
        title, 
        content, 
        author_id, 
        published || false
      );
      
      res.status(201).json(post);
    } catch (error) {
      // Error de foreign key (autor no existe)
      if (error.code === '23503') {
        return res.status(400).json({ error: 'Author does not exist' });
      }
      next(error);
    }
  },

  // PUT /posts/:id
  async updatePost(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, published } = req.body;
      
      // Validaciones
      if (!title || !content) {
        return res.status(400).json({ 
          error: 'Title and content are required' 
        });
      }
      
      const post = await postsService.updatePost(
        id, 
        title, 
        content, 
        published !== undefined ? published : false
      );
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },

  // DELETE /posts/:id
  async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postsService.deletePost(id);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

export default postsController;