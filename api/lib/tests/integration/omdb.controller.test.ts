import bodyParser from 'body-parser';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import OMDBController from '../../controllers/omdb.controller';

let app: express.Application;
let mongod: MongoMemoryServer;

beforeAll(async () => {

    // given
    app = express();
    app.use(bodyParser.json());
    app.use('/', new OMDBController().router);

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

describe('OMDBController', () => {
    describe('/api/omdb/movie/:title', () => {
        test('should return a movie with provided name', async () => {

            const title = 'The Hateful Eight';

            const res = await request(app)
                .get(`/api/omdb/movie/${title}`);

            expect(res.status).toBeGreaterThanOrEqual(200);
            expect(Object.keys(res.body).length).toBeGreaterThan(0);
        })

        test('should not return anything', async () => {

            const title = 'The Hateful E';

            const res = await request(app)
                .get(`/api/omdb/movie/${title}`);

            expect(res.status).toBe(200);
            expect(res.body.Response).toBe('False');
        })
    })
})