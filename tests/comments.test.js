import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Comments API', () => {
  describe('GET /comments', () => {
    it('should return all comments with author and post info', async () => {
      const response = await request(app).get('/comments');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      
      // Verificar que incluye datos del JOIN
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('author_name');
        expect(response.body[0]).toHaveProperty('post_title');
      }
    });
  });

  describe('GET /comments/:id', () => {
    it('should return a single comment with details', async () => {
      const response = await request(app).get('/comments/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('content');
      expect(response.body).toHaveProperty('author_name');
      expect(response.body).toHaveProperty('post_title');
    });

    it('should return 404 for non-existent comment', async () => {
      const response = await request(app).get('/comments/9999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /comments/post/:postId', () => {
    it('should return comments for a specific post', async () => {
      const response = await request(app).get('/comments/post/1');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('author_name');
        expect(response.body[0]).not.toHaveProperty('post_title');
      }
    });
  });

  describe('GET /comments/author/:authorId', () => {
    it('should return comments by a specific author', async () => {
      const response = await request(app).get('/comments/author/1');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('post_title');
        expect(response.body[0]).not.toHaveProperty('author_name');
      }
    });
  });

  describe('POST /comments', () => {
    it('should create a new comment', async () => {
      const newComment = {
        post_id: 1,
        author_id: 2,
        content: 'Test comment from Vitest'
      };

      const response = await request(app)
        .post('/comments')
        .send(newComment);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.content).toBe(newComment.content);
      expect(response.body.post_id).toBe(newComment.post_id);
      expect(response.body.author_id).toBe(newComment.author_id);
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/comments')
        .send({ content: 'Missing post_id and author_id' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if post does not exist', async () => {
      const response = await request(app)
        .post('/comments')
        .send({
          post_id: 9999,
          author_id: 1,
          content: 'Comment on non-existent post'
        });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Post or Author');
    });

    it('should return 400 if author does not exist', async () => {
      const response = await request(app)
        .post('/comments')
        .send({
          post_id: 1,
          author_id: 9999,
          content: 'Comment by non-existent author'
        });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Post or Author');
    });
  });

  describe('PUT /comments/:id', () => {
    it('should update a comment', async () => {
      const response = await request(app)
        .put('/comments/1')
        .send({ content: 'Updated comment content' });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body.content).toBe('Updated comment content');
    });

    it('should return 400 if content is missing', async () => {
      const response = await request(app)
        .put('/comments/1')
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 404 for non-existent comment', async () => {
      const response = await request(app)
        .put('/comments/9999')
        .send({ content: 'Updated content' });
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /comments/:id', () => {
    it('should delete a comment', async () => {
      // Primero crear un comentario para eliminar
      const createResponse = await request(app)
        .post('/comments')
        .send({
          post_id: 1,
          author_id: 1,
          content: 'Comment to be deleted'
        });
      
      const commentId = createResponse.body.id;
      
      const response = await request(app).delete(`/comments/${commentId}`);
      
      expect(response.status).toBe(204);
    });

    it('should return 404 for non-existent comment', async () => {
      const response = await request(app).delete('/comments/9999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});