import authorsService from '../services/authorsService.js';

const authorsController = {
  // GET /authors
  async getAllAuthors(req, res, next) {
    try {
      const authors = await authorsService.getAllAuthors();
      res.status(200).json(authors);
    } catch (error) {
      next(error);
    }
  },

  // GET /authors/:id
  async getAuthorById(req, res, next) {
    try {
      const { id } = req.params;
      const author = await authorsService.getAuthorById(id);
      
      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }
      
      res.status(200).json(author);
    } catch (error) {
      next(error);
    }
  },

  // POST /authors
  async createAuthor(req, res, next) {
    try {
      const { name, email, bio } = req.body;
      
      // Validaciones
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }
      
      const author = await authorsService.createAuthor(name, email, bio || null);
      res.status(201).json(author);
    } catch (error) {
      // Error de email duplicado
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Email already exists' });
      }
      next(error);
    }
  },

  // PUT /authors/:id
  async updateAuthor(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, bio } = req.body;
      
      // Validaciones
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }
      
      const author = await authorsService.updateAuthor(id, name, email, bio || null);
      
      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }
      
      res.status(200).json(author);
    } catch (error) {
      // Error de email duplicado
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Email already exists' });
      }
      next(error);
    }
  },

  // DELETE /authors/:id
  async deleteAuthor(req, res, next) {
    try {
      const { id } = req.params;
      const author = await authorsService.deleteAuthor(id);
      
      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

export default authorsController;