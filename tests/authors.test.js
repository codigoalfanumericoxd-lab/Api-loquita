import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Authors API', () => {
  describe('GET /authors', () => {
    it('should return all authors', async () => {
      const response = await request(app).get('/authors');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /authors/:id', () => {
    it('should return a single author', async () => {
      const response = await request(app).get('/authors/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
    });

    it('should return 404 for non-existent author', async () => {
      const response = await request(app).get('/authors/9999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /authors', () => {
    it('should create a new author', async () => {
      const newAuthor = {
        name: 'Test Author',
        email: `test${Date.now()}@test.com`,
        bio: 'Test bio'
      };

      const response = await request(app)
        .post('/authors')
        .send(newAuthor);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newAuthor.name);
      expect(response.body.email).toBe(newAuthor.email);
    });

    it('should return 400 if name or email is missing', async () => {
      const response = await request(app)
        .post('/authors')
        .send({ name: 'Test' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});