import pool from '../config/database.js';

const commentsService = {
  // GET /comments - Listar todos los comentarios
  async getAllComments() {
    const result = await pool.query(
      `SELECT 
        c.id, 
        c.content, 
        c.created_at,
        c.post_id,
        p.title as post_title,
        c.author_id,
        a.name as author_name
      FROM comments c
      INNER JOIN posts p ON c.post_id = p.id
      INNER JOIN authors a ON c.author_id = a.id
      ORDER BY c.created_at DESC`
    );
    return result.rows;
  },

  // GET /comments/:id - Obtener un comentario por ID
  async getCommentById(id) {
    const result = await pool.query(
      `SELECT 
        c.id, 
        c.content, 
        c.created_at,
        c.post_id,
        p.title as post_title,
        c.author_id,
        a.name as author_name
      FROM comments c
      INNER JOIN posts p ON c.post_id = p.id
      INNER JOIN authors a ON c.author_id = a.id
      WHERE c.id = $1`,
      [id]
    );
    return result.rows[0];
  },

  // GET /comments/post/:postId - Comentarios de un post
  async getCommentsByPost(postId) {
    const result = await pool.query(
      `SELECT 
        c.id, 
        c.content, 
        c.created_at,
        c.author_id,
        a.name as author_name,
        a.email as author_email
      FROM comments c
      INNER JOIN authors a ON c.author_id = a.id
      WHERE c.post_id = $1
      ORDER BY c.created_at DESC`,
      [postId]
    );
    return result.rows;
  },

  // GET /comments/author/:authorId - Comentarios de un autor
  async getCommentsByAuthor(authorId) {
    const result = await pool.query(
      `SELECT 
        c.id, 
        c.content, 
        c.created_at,
        c.post_id,
        p.title as post_title
      FROM comments c
      INNER JOIN posts p ON c.post_id = p.id
      WHERE c.author_id = $1
      ORDER BY c.created_at DESC`,
      [authorId]
    );
    return result.rows;
  },

  // POST /comments - Crear un comentario
  async createComment(postId, authorId, content) {
    const result = await pool.query(
      `INSERT INTO comments (post_id, author_id, content) 
       VALUES ($1, $2, $3) 
       RETURNING id, post_id, author_id, content, created_at`,
      [postId, authorId, content]
    );
    return result.rows[0];
  },

  // PUT /comments/:id - Actualizar un comentario
  async updateComment(id, content) {
    const result = await pool.query(
      `UPDATE comments 
       SET content = $1 
       WHERE id = $2 
       RETURNING id, post_id, author_id, content, created_at`,
      [content, id]
    );
    return result.rows[0];
  },

  // DELETE /comments/:id - Eliminar un comentario
  async deleteComment(id) {
    const result = await pool.query(
      'DELETE FROM comments WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }
};

export default commentsService;