import bodyParser from 'body-parser';
import SpotifyController from '../../controllers/spotify.controller';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

let app: express.Application;
let mongod: MongoMemoryServer;

beforeAll(async () => {

    // given
    app = express();
    app.use(bodyParser.json());
    app.use('/', new SpotifyController().router);

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

describe('SpotifyController', () => {
    describe('/api/spotify/search/:track', () => {
        test('should return a list of songs', async () => {

            const songName = 'Cruel Summer';

            const res = await request(app)
                .get(`/api/spotify/search/${songName}`);

            expect(res.status).toBeGreaterThanOrEqual(200);
            expect(res.body.tracks.items.length).toBeGreaterThan(0);
        })

        test('should return code 404', async () => {

            const songName = '';

            const res = await request(app)
                .get(`/api/spotify/search/${songName}`);

            expect(res.status).toBe(404);
        })
    })
})