import dotenv from 'dotenv';
import app from './app.js';
import pool from './config/database.js';

dotenv.config();    

const PORT = process.env.PORT || 3000;

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Database connected at:', res.rows[0].now);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});