-- Eliminar tablas si existen (para poder recrear)
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS authors;

-- Crear tabla authors
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  author_id INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- Crear índices para mejorar performance
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_authors_email ON authors(email);