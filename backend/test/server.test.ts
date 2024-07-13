// test/server.test.ts
import request from 'supertest';
import app from '../src/server'; // Adjust the path to your app file
import { shutdownServer } from '../src/server';

describe('Sleep Data API', () => {
    describe('POST /api/sleep', () => {
        it('should add or update sleep data', async () => {
            const response = await request(app)
                .post('/api/sleep')
                .send({
                    name: 'John',
                    gender: 'Male',
                    sleepDuration: 8,
                    date: '2023-07-10'
                });

            expect(response.status).toBe(200);
        });

        it('should return 400 for invalid date format', async () => {
            const response = await request(app)
                .post('/api/sleep')
                .send({
                    name: 'John',
                    gender: 'Male',
                    sleepDuration: 8,
                    date: 'invalid-date'
                });

            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid date format');
        });
    });

    describe('PUT /api/sleep', () => {
        it('should update sleep data', async () => {
            const response = await request(app)
                .put('/api/sleep')
                .send({
                    name: 'John',
                    gender: 'Male',
                    sleepDuration: 6,
                    date: '2023-07-10'
                });

            expect(response.status).toBe(200);
        });

        it('should return 404 if record not found', async () => {
            const response = await request(app)
                .put('/api/sleep')
                .send({
                    name: 'Nonexistent',
                    gender: 'Male',
                    sleepDuration: 6,
                    date: '2023-07-10'
                });

            expect(response.status).toBe(404);
            expect(response.text).toBe('Record not found');
        });
    });

    describe('GET /api/sleep/stats', () => {
        it('should return sleep stats', async () => {
            const response = await request(app).get('/api/sleep/stats');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('GET /api/sleep/:name/:gender/last', () => {
        it('should return last 7 days of sleep data', async () => {
            const response = await request(app).get('/api/sleep/John/Male/last');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });
});


afterAll(() => {
    shutdownServer();
});
