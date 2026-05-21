-- Insertar autores de prueba
INSERT INTO authors (name, email, bio) VALUES
('Angelica García', 'angie@devspark.com', 'Backend developer apasionada por crear APIs eficientes'),
('Carlos Mendoza', 'carlos@devspark.com', 'Full-stack developer especializado en Node.js'),
('María López', 'maria@devspark.com', 'Frontend developer con experiencia en React');

-- Insertar posts de prueba
INSERT INTO posts (title, content, author_id, published) VALUES
('Mi primer post en MiniBlog', 'Este es mi primer post en la plataforma. Estoy emocionada de compartir contenido aquí.', 1, true),
('Aprendiendo PostgreSQL', 'Hoy aprendí sobre relaciones entre tablas y foreign keys. Es fascinante cómo se conectan los datos.', 1, true),
('Tips de Node.js', 'Aquí comparto algunos tips para mejorar el performance de aplicaciones Node.js...', 2, true),
('Express vs Fastify', 'Comparativa entre los dos frameworks más populares de Node.js', 2, false),
('React Hooks explicados', 'Una guía completa sobre cómo usar hooks en React de forma efectiva', 3, true),
('Borrador: Ideas para el blog', 'Este es un borrador con ideas que quiero desarrollar más adelante', 3, false);