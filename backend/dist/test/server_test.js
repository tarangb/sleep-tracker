"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// test/api.test.ts
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const server_1 = __importDefault(require("../src/server")); // Adjust the path to your app file
describe('Sleep Data API', () => {
    describe('POST /api/sleep', () => {
        it('should add or update sleep data', async () => {
            const response = await (0, supertest_1.default)(server_1.default)
                .post('/api/sleep')
                .send({
                name: 'John',
                gender: 'Male',
                sleepDuration: 8,
                date: '2023-07-10'
            });
            (0, chai_1.expect)(response.status).to.equal(200);
        });
        it('should return 400 for invalid date format', async () => {
            const response = await (0, supertest_1.default)(server_1.default)
                .post('/api/sleep')
                .send({
                name: 'John',
                gender: 'Male',
                sleepDuration: 8,
                date: 'invalid-date'
            });
            (0, chai_1.expect)(response.status).to.equal(400);
            (0, chai_1.expect)(response.text).to.equal('Invalid date format');
        });
    });
    describe('PUT /api/sleep', () => {
        it('should update sleep data', async () => {
            const response = await (0, supertest_1.default)(server_1.default)
                .put('/api/sleep')
                .send({
                name: 'John',
                gender: 'Male',
                sleepDuration: 6,
                date: '2023-07-10'
            });
            (0, chai_1.expect)(response.status).to.equal(200);
        });
        it('should return 404 if record not found', async () => {
            const response = await (0, supertest_1.default)(server_1.default)
                .put('/api/sleep')
                .send({
                name: 'Nonexistent',
                gender: 'Male',
                sleepDuration: 6,
                date: '2023-07-10'
            });
            (0, chai_1.expect)(response.status).to.equal(404);
            (0, chai_1.expect)(response.text).to.equal('Record not found');
        });
    });
    describe('GET /api/sleep/stats', () => {
        it('should return sleep stats', async () => {
            const response = await (0, supertest_1.default)(server_1.default).get('/api/sleep/stats');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('array');
        });
    });
    describe('GET /api/sleep/:name/:gender/last7days', () => {
        it('should return last 7 days of sleep data', async () => {
            const response = await (0, supertest_1.default)(server_1.default).get('/api/sleep/John/Male/last7days');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('array');
        });
    });
});
