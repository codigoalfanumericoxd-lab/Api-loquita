import express from 'express';
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'MiniBlog API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Rutas
import authorsRoutes from './routes/authorsRoutes.js';
import postsRoutes from './routes/postsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';

app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

export default app;