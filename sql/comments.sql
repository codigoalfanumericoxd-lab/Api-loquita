-- Crear tabla comments
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id INTEGER NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON comments(author_id);

-- Datos de prueba
INSERT INTO comments (post_id, author_id, content) VALUES
(1, 2, 'Excelente post sobre MiniBlog, muy útil!'),
(1, 3, 'Me ayudó mucho esta explicación, gracias!'),
(2, 1, 'Gran contenido sobre PostgreSQL'),
(3, 2, 'Interesante perspectiva sobre Node.js');