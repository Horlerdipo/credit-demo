import request from 'supertest';
import app from '../src/main';
import server from '../src/main';
import {setupTestDatabase, cleanupTestDatabase} from '../jest.setup'

const testDetail = [
    {
        email: "test@gmail.com",
        pin: "1234",
        name: "Test Test",
        token: "",
        account_number: "",
        amount: 0,
    },
    {
        email: "test1@gmail.com",
        pin: "1234",
        name: "Test Test",
        token: "",
        account_number: "",
        amount: 0,
    }
]


async function setupUserAccount(testDetail: { email: any; pin: any; name: any; token: any; account_number: any; amount?: number; }) {
    const createUser = await request(app)
        .post('/user')
        .send({
            email: testDetail.email,
            pin: testDetail.pin,
            name: testDetail.name,
        });
    testDetail.token = createUser.body.data.token;
    testDetail.account_number = createUser.body.data.account_number;
}

beforeAll(async () => {
    await setupTestDatabase();
    await setupUserAccount(testDetail[0]);
    await setupUserAccount(testDetail[1]);
});

afterAll(async () => {
    await cleanupTestDatabase();
});

afterAll(done => {
    console.log("Closing servers now");
    server.close();
    done();
});

describe('POST /wallet/fund', () => {
    it('should return authentication Error', async () => {
        const result = await request(app)
            .post('/wallet/fund');
        expect(result.status).toEqual(400);
    });

    it('should return wrong account number error', async () => {
        const result = await request(app)
            .post('/wallet/fund')
            .set('auth-token', testDetail[0].token)
            .send({
                account_number: "wrong-account",
                pin: testDetail[0].pin,
                amount: 2000
            });

        expect(result.status).toEqual(400);
    });

    it('should return wrong pin error', async () => {
        const result = await request(app)
            .post('/wallet/fund')
            .set('auth-token', testDetail[0].token)
            .send({
                account_number: testDetail[0].account_number,
                pin: "wrong",
                amount: 2000
            });

        expect(result.status).toEqual(400);
    });

    it('should be able to fund account', async () => {
        const result = await request(app)
            .post('/wallet/fund')
            .set('auth-token', testDetail[0].token)
            .send({
                account_number: testDetail[0].account_number,
                pin: testDetail[0].pin,
                amount: 2000
            });
        testDetail[0].amount = result.body.data.amount
        expect(result.status).toEqual(200);
    });
});

describe('POST /wallet/transfer', () => {
    it('should return authentication Error', async () => {
        const result = await request(app)
            .post('/wallet/transfer');
        expect(result.status).toEqual(400);
    });

    it('should return wrong account number error', async () => {
        const result = await request(app)
            .post('/wallet/transfer')
            .send({
                account_number: "wrong-account",
                pin: testDetail[0].pin,
                amount: 2000
            })
            .set('auth-token', testDetail[0].token);
        expect(result.status).toEqual(400);
    });

    it('should return wrong pin error', async () => {
        const result = await request(app)
            .post('/wallet/transfer')
            .send({
                account_number: testDetail[1].account_number,
                pin: "wrong-pin",
                amount: 2000
            })
            .set('auth-token', testDetail[0].token);
        expect(result.status).toEqual(400);
    });

    it('should return cannot transfer to your own wallet error', async() => {
        const result = await request(app)
            .post('/wallet/transfer')
            .send({
                account_number: testDetail[0].account_number,
                pin: testDetail[0].pin,
                amount: 2000
            })
            .set('auth-token', testDetail[0].token);
        expect(result.status).toEqual(400);
    });

    it('should return insufficient funds error', async() => {
        const result = await request(app)
            .post('/wallet/transfer')
            .send({
                account_number: testDetail[1].account_number,
                pin: testDetail[0].pin,
                amount: 3000
            })
            .set('auth-token', testDetail[0].token);
        expect(result.status).toEqual(400);
    });

    it('should be able to transfer funds', async () => {
        const result = await request(app)
            .post('/wallet/transfer')
            .send({
                account_number: testDetail[1].account_number,
                pin: testDetail[0].pin,
                amount: 2000
            })
            .set('auth-token', testDetail[0].token);
        expect(result.status).toEqual(200);
    });
});

describe('POST /wallet/transfer', () => {
    it('should return authentication Error', async () => {
        const result = await request(app)
            .post('/wallet/withdraw');
        expect(result.status).toEqual(400);
    });

    it('should return wrong account number error', async () => {
        const result = await request(app)
            .post('/wallet/withdraw')
            .send({
                account_number: "wrong-account",
                pin: testDetail[1].pin,
                amount: 2000
            })
            .set('auth-token', testDetail[1].token);
        expect(result.status).toEqual(400);
    });

    it('should return wrong pin error', async () => {
        const result = await request(app)
            .post('/wallet/withdraw')
            .send({
                account_number: testDetail[1].account_number,
                pin: "wrong-pin",
                amount: 2000
            })
            .set('auth-token', testDetail[1].token);
        expect(result.status).toEqual(400);
    });

    it('should return cannot transfer from another account error', async() => {
        const result = await request(app)
            .post('/wallet/withdraw')
            .send({
                account_number: testDetail[0].account_number,
                pin: testDetail[1].pin,
                amount: 2000
            })
            .set('auth-token', testDetail[1].token);
        expect(result.status).toEqual(400);
    });

    it('should return insufficient funds error', async() => {
        const result = await request(app)
            .post('/wallet/withdraw')
            .send({
                account_number: testDetail[1].account_number,
                pin: testDetail[0].pin,
                amount: 3000
            })
            .set('auth-token', testDetail[1].token);
        expect(result.status).toEqual(400);
    });

    it('should be able to withdraw funds', async () => {
        const result = await request(app)
            .post('/wallet/withdraw')
            .send({
                account_number: testDetail[1].account_number,
                pin: testDetail[1].pin,
                amount: 2000
            })
            .set('auth-token', testDetail[1].token);
        expect(result.status).toEqual(200);
        // process.exit(0);
    });
});