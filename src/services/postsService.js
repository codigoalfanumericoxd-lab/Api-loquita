import pool from '../config/database.js';

const postsService = {
  // GET /posts - Listar todos los posts
  async getAllPosts() {
    const result = await pool.query(
      'SELECT id, author_id, title, content, published, created_at FROM posts ORDER BY id'
    );
    return result.rows;
  },

  // GET /posts/:id - Obtener un post por ID
  async getPostById(id) {
    const result = await pool.query(
      'SELECT id, author_id, title, content, published, created_at FROM posts WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  // GET /posts/author/:authorId - Posts con detalle de autor (JOIN)
  async getPostsByAuthor(authorId) {
    const result = await pool.query(
      `SELECT 
        p.id, 
        p.title, 
        p.content, 
        p.published, 
        p.created_at,
        a.id as author_id,
        a.name as author_name,
        a.email as author_email,
        a.bio as author_bio
      FROM posts p
      INNER JOIN authors a ON p.author_id = a.id
      WHERE p.author_id = $1
      ORDER BY p.id`,
      [authorId]
    );
    return result.rows;
  },

  // POST /posts - Crear un post
  async createPost(title, content, authorId, published = false) {
    const result = await pool.query(
      'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING id, author_id, title, content, published, created_at',
      [title, content, authorId, published]
    );
    return result.rows[0];
  },

  // PUT /posts/:id - Actualizar un post
  async updatePost(id, title, content, published) {
    const result = await pool.query(
      'UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 RETURNING id, author_id, title, content, published, created_at',
      [title, content, published, id]
    );
    return result.rows[0];
  },

  // DELETE /posts/:id - Eliminar un post
  async deletePost(id) {
    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }
};

export default postsService;