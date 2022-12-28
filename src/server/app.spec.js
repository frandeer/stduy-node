const supertest = require('supertest');

const app = require('./app');

const request = supertest(app);


// describe('GET /user', () => {
//   it('should return 200', async () => {
//     const response = await request.get('/user');
//     expect(response.status).toBe(200);
//   });
// });


test('user name string',  async () => {
  // expect(2).toBe(1);
  const result = await request.get('/user/profile');
  
  expect(result.body).toMatchObject({
    name: expect.any(String),
  });

});


test('user text',  async () => {
  // expect(2).toBe(1);
  const result = await request.get('/user');
  
  expect(result.text).toMatch(/^<html>.*<\/html>$/)

});