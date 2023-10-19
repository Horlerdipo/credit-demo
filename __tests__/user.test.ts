import request from 'supertest';
import app from '../src/main';
import server from '../src/main';
import {setupTestDatabase, cleanupTestDatabase} from '../jest.setup'

beforeAll(async () => {
    await setupTestDatabase();
});

afterAll(async () => {
    await cleanupTestDatabase();
});

afterAll(done => {
    console.log("Closing servers now");
    server.close();
    done();
});

const testDetail = {
    email: "test1@gmail.com",
    pin: "1234",
    name: "Test Test",
    token: ""
}

describe('GET /health', () => {
    it('should return Online', async () => {
        const result = await request(app).get('/health');
        expect(result.status).toEqual(200);
    });
});

describe('POST /user', () => {
    it('should return validation Error', async () => {
        const result = await request(app)
            .post('/user')
            .send({
                email: testDetail.email,
            });
        expect(result.status).toEqual(400);
    });

    it('should be able to register user', async () => {
        const result = await request(app)
            .post('/user')
            .send({
                email: testDetail.email,
                pin: testDetail.pin,
                name: testDetail.name,
            });

        expect(result.status).toEqual(201);
        expect(result.body.statusCode).toEqual(201);
        expect(result.body.data.token).toBeDefined();
        testDetail.token = result.body.data.token;
    });

    it('should not be able to register the same user', async () => {
        const result = await request(app)
            .post('/user')
            .send({
                email: testDetail.email,
                pin: testDetail.pin,
                name: testDetail.name,
            });
        expect(result.status).toEqual(400);
    });
});

describe('POST /user/token', () => {
    it('should return validation Error', async () => {
        const result = await request(app)
            .post('/user/token')
            .send({
                email: testDetail.email,
            });
        expect(result.status).toEqual(400);
    });

    it('should be able to generate new token', async () => {
        const result = await request(app)
            .post('/user/token')
            .send({
                email: testDetail.email,
                pin: testDetail.pin,
            });
        expect(result.status).toEqual(200);
        expect(result.body.statusCode).toEqual(200);
        expect(result.body.data.token).toBeDefined();
        testDetail.token = result.body.data.token;
    });
});

describe('POST /user/details', () => {
    it('should return authentication error', async () => {
        const result = await request(app)
            .post('/user/details');
        expect(result.status).toEqual(400);
    });

    it('should be able to get user details', async () => {
        const result = await request(app)
            .post('/user/details')
            .set('auth-token', testDetail.token);
        expect(result.status).toEqual(200);
        expect(result.body.statusCode).toEqual(200);
        expect(result.body.data.token).toBeDefined();
    });
});


describe('POST /user/transactions', () => {
    it('should return authentication error', async () => {
        const result = await request(app)
            .post('/user/transactions');
        expect(result.status).toEqual(400);
    });

    it('should be able to get user transaction details', async () => {
        const result = await request(app)
            .post('/user/transactions')
            .set('auth-token', testDetail.token);
        expect(result.status).toEqual(200);
        expect(result.body.statusCode).toEqual(200);
        expect(result.body.data.transactions).toBeDefined();
    });
});

