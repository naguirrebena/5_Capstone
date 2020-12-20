const app = require('../server/server');
const supertest = require('supertest');
const request = supertest(app);

describe('Correct endpoints', () => {
    it ('return html file', async done => {
        const res =  await request.get('/')
        expect(res.status).toBe(200);
        done();
    })
})