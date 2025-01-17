import bodyParser from 'body-parser';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import UserController from 'controllers/user.controller';

let app: express.Application;
let mongod: MongoMemoryServer;

beforeAll(async () => {

    // given
    app = express();
    app.use(bodyParser.json());
    app.use('/', new UserController().router);

    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
});

describe('UserController', () => {
    describe('/api/user/create', () => {
        test('should return code 200', async () => {
            const user = {name: 'Test'};

            const res = await request(app)
            .post('/api/user/create')
            .send(user)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

            expect(res.status).toBe(200);
        })

        test('should return code 2137', async () => {
            const user = {name: 'Test'};

            const res = await request(app)
            .post('/api/user/create')
            .send(user)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

            const res2 = await request(app)
            .post('/api/user/create')
            .send(user)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

            expect(res2.body.code).toBe(2137);
            expect(res2.body.msg).toBe('User exists');
        })
    })

    describe('/api/user/auth', () => {
        test('should fail - no user like this', async () => {
            const user = {name: 'Test', password: '123'};

            const res = await request(app)
            .post('/api/user/auth')
            .send(user)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

            expect(res.body.code).toBe(2137);
            expect(res.body.error).toBe('Unauthorized');
        })

        test('should fail - mismatched password', async () => {
            const user = {name: 'Test', password: '123'};

            const res = await request(app)
            .post('/api/user/create')
            .send(user)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

            user.password = '124';

            const res2 = await request(app)
            .post('/api/user/auth')
            .send(user)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

            expect(res2.body.status).toBe(2138);
            expect(res2.body.error).toBe('Invalid password');
        })
    })
})