import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Posts API', () => {
  describe('GET /posts', () => {
    it('should return all posts', async () => {
      const response = await request(app).get('/posts');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /posts/:id', () => {
    it('should return a single post', async () => {
      const response = await request(app).get('/posts/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('content');
      expect(response.body).toHaveProperty('author_id');
    });

    it('should return 404 for non-existent post', async () => {
      const response = await request(app).get('/posts/9999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /posts/author/:authorId', () => {
    it('should return posts with author details', async () => {
      const response = await request(app).get('/posts/author/1');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('author_name');
        expect(response.body[0]).toHaveProperty('author_email');
      }
    });
  });

  describe('POST /posts', () => {
    it('should create a new post', async () => {
      const newPost = {
        title: 'Test Post',
        content: 'This is a test post content',
        author_id: 1,
        published: true
      };

      const response = await request(app)
        .post('/posts')
        .send(newPost);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newPost.title);
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/posts')
        .send({ title: 'Test' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if author does not exist', async () => {
      const response = await request(app)
        .post('/posts')
        .send({
          title: 'Test',
          content: 'Test content',
          author_id: 9999
        });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Author');
    });
  });
});