import pool from '../config/database.js';

const authorsService = {
  // GET /authors - Listar todos los autores
  async getAllAuthors() {
    const result = await pool.query(
      'SELECT id, name, email, bio, created_at FROM authors ORDER BY id'
    );
    return result.rows;
  },

  // GET /authors/:id - Obtener un autor por ID
  async getAuthorById(id) {
    const result = await pool.query(
      'SELECT id, name, email, bio, created_at FROM authors WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  // POST /authors - Crear un autor
  async createAuthor(name, email, bio) {
    const result = await pool.query(
      'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING id, name, email, bio, created_at',
      [name, email, bio]
    );
    return result.rows[0];
  },

  // PUT /authors/:id - Actualizar un autor
  async updateAuthor(id, name, email, bio) {
    const result = await pool.query(
      'UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING id, name, email, bio, created_at',
      [name, email, bio, id]
    );
    return result.rows[0];
  },

  // DELETE /authors/:id - Eliminar un autor
  async deleteAuthor(id) {
    const result = await pool.query(
      'DELETE FROM authors WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }
};

export default authorsService;