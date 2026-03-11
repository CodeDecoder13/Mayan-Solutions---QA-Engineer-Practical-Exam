import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Testing - JSONPlaceholder', () => {

  // ==========================================
  // API 1: GET /users - Retrieve all users
  // ==========================================
  test.describe('GET /users', () => {

    test('should retrieve all users with status 200', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/users`);

      expect(response.status()).toBe(200);

      const users = await response.json();
      expect(Array.isArray(users)).toBeTruthy();
      expect(users.length).toBe(10);

      // Verify user object structure
      const firstUser = users[0];
      expect(firstUser).toHaveProperty('id');
      expect(firstUser).toHaveProperty('name');
      expect(firstUser).toHaveProperty('username');
      expect(firstUser).toHaveProperty('email');
      expect(firstUser).toHaveProperty('address');
      expect(firstUser).toHaveProperty('phone');
      expect(firstUser).toHaveProperty('website');
      expect(firstUser).toHaveProperty('company');
    });

    test('Edge Case: GET /users with invalid query param', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/users?id=invalid`);

      expect(response.status()).toBe(200);

      const users = await response.json();
      // Should return empty array for invalid filter
      expect(Array.isArray(users)).toBeTruthy();
    });

  });

  // ==========================================
  // API 2: GET /users/:id - Retrieve specific user
  // ==========================================
  test.describe('GET /users/:id', () => {

    test('should retrieve user with id 1', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/users/1`);

      expect(response.status()).toBe(200);

      const user = await response.json();
      expect(user.id).toBe(1);
      expect(user.name).toBe('Leanne Graham');
      expect(user.username).toBe('Bret');
      expect(user.email).toBe('Sincere@april.biz');
    });

    test('Edge Case: GET /users/999 - non-existent user', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/users/999`);

      // JSONPlaceholder returns 404 for non-existent resources
      expect(response.status()).toBe(404);
    });

    test('Edge Case: GET /users/0 - invalid user id', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/users/0`);

      expect(response.status()).toBe(404);
    });

  });

  // ==========================================
  // API 3: POST /posts - Create a new post
  // ==========================================
  test.describe('POST /posts', () => {

    test('should create a new post with status 201', async ({ request }) => {
      const postData = {
        title: 'QA Test Post',
        body: 'Testing API endpoint',
        userId: 1,
      };

      const response = await request.post(`${BASE_URL}/posts`, {
        data: postData,
      });

      expect(response.status()).toBe(201);

      const createdPost = await response.json();
      expect(createdPost.title).toBe('QA Test Post');
      expect(createdPost.body).toBe('Testing API endpoint');
      expect(createdPost.userId).toBe(1);
      expect(createdPost).toHaveProperty('id');
    });

    test('Edge Case: POST /posts with empty body', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/posts`, {
        data: {},
      });

      // JSONPlaceholder still returns 201 for empty body (it's a mock API)
      expect(response.status()).toBe(201);

      const createdPost = await response.json();
      expect(createdPost).toHaveProperty('id');
    });

    test('Edge Case: POST /posts with missing required fields', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/posts`, {
        data: { title: 'Only Title' },
      });

      // JSONPlaceholder accepts partial data (mock API behavior)
      expect(response.status()).toBe(201);
    });

  });

  // ==========================================
  // API 4: PUT /posts/:id - Update an existing post
  // ==========================================
  test.describe('PUT /posts/:id', () => {

    test('should update post with id 1 and return status 200', async ({ request }) => {
      const updatedData = {
        title: 'Updated Post',
        body: 'Updated content',
        userId: 1,
      };

      const response = await request.put(`${BASE_URL}/posts/1`, {
        data: updatedData,
      });

      expect(response.status()).toBe(200);

      const updatedPost = await response.json();
      expect(updatedPost.title).toBe('Updated Post');
      expect(updatedPost.body).toBe('Updated content');
      expect(updatedPost.userId).toBe(1);
      expect(updatedPost.id).toBe(1);
    });

    test('Edge Case: PUT /posts/999 - update non-existent post', async ({ request }) => {
      const response = await request.put(`${BASE_URL}/posts/999`, {
        data: {
          title: 'Ghost Post',
          body: 'This post does not exist',
          userId: 1,
        },
      });

      // JSONPlaceholder returns 500 for non-existent post update
      expect(response.ok()).toBeFalsy();
    });

    test('Edge Case: PUT /posts/1 with partial data', async ({ request }) => {
      const response = await request.put(`${BASE_URL}/posts/1`, {
        data: { title: 'Partial Update Only' },
      });

      expect(response.status()).toBe(200);

      const updatedPost = await response.json();
      expect(updatedPost.title).toBe('Partial Update Only');
    });

  });

});
