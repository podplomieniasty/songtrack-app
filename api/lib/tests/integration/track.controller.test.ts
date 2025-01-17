import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from 'supertest';
import trackModel, {ITrack} from "../../models/track.model";
import UserController from "../../controllers/user.controller";
import express from 'express';
import TrackController from "../../controllers/track.controller";
import bodyParser from "body-parser";

let app: express.Application;
let mongod: MongoMemoryServer;

beforeAll(async () => {

    // given
    app = express();
    app.use(bodyParser.json());
    app.use('/', new TrackController().router);

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

describe("TrackController", () => {

    describe("/api/track/all", () => {
        test('should return 200 and list of tracks', async () => {
            const track: ITrack = {
                spotifyId: "123",
                img: "image.jpg",
                name: "Test Track",
                artist: "Test Artist",
                href: "http://example.com",
                movies: [
                    {
                        id: "movie1",
                        name: "Movie 1",
                        plot: "Plot of Movie 1",
                        year: "2023",
                        img: "movie1.jpg",
                    },
                ],
            };
            await new trackModel(track).save();

            // when
            const res = await request(app)
                .get('/api/track/all');

            // then
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
        })

        test('should return 200 and empty list', async () => {
            
            // when
            const res = await request(app)
                .get('/api/track/all');

            // then
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(0);
        })
    })

    describe('/api/track/add', () => {
        test('should add new track to db', async () => {
            // given
            const track: ITrack = {
                spotifyId: "123",
                img: "image.jpg",
                name: "Test Track",
                artist: "Test Artist",
                href: "http://example.com",
                movies: [
                    {
                        id: "movie1",
                        name: "Movie 1",
                        plot: "Plot of Movie 1",
                        year: "2023",
                        img: "movie1.jpg",
                    },
                ],
            };

            const res = await request(app)
                .post('/api/track/add')
                .set('content-type', 'application/json')
                .send(track);

            // then
            expect(res.status).toBe(200);
        })

        test('should update tracks movie array', async () => {
            // given
            const track: ITrack = {
                spotifyId: "123",
                img: "image.jpg",
                name: "Test Track",
                artist: "Test Artist",
                href: "http://example.com",
                movies: [
                    {
                        id: "movie1",
                        name: "Movie 1",
                        plot: "Plot of Movie 1",
                        year: "2023",
                        img: "movie1.jpg",
                    },
                ],
            };
            await new trackModel(track).save();
            track.movies = [{
                id: "movie2",
                name: "Movie 2",
                plot: "Plot of Movie 2",
                year: "2023",
                img: "movie2.jpg",
            }]

            await request(app)
                .post('/api/track/add')
                .set('content-type', 'application/json')
                .send(track);

            const res = await request(app)
                .get('/api/track/all')

            // then
            expect(res.status).toBe(200);
            expect(res.body[0].movies.length).toBe(2);
        })

        test('should throw an error', async () => {
            // given
            const track = {};

            const res = await request(app)
                .post('/api/track/add')
                .set('content-type', 'application/json')
                .send(track);

            expect(res.status).toBe(400);

        })

        test('should throw an error without id', async () => {
            // given
            const track: ITrack = {
                spotifyId: "",
                img: "image.jpg",
                name: "Test Track",
                artist: "Test Artist",
                href: "http://example.com",
                movies: [
                    {
                        id: "movie1",
                        name: "Movie 1",
                        plot: "Plot of Movie 1",
                        year: "2023",
                        img: "movie1.jpg",
                    },
                ],
            };

            const res = await request(app)
                .post('/api/track/add')
                .set('content-type', 'application/json')
                .send(track);

            // then
            expect(res.status).toBe(400);
        })

        test('should add', async () => {
            // given
            const track: ITrack = {
                spotifyId: "123",
                img: "",
                name: "",
                artist: "",
                href: "",
                movies: [
                    
                ],
            };

            const res = await request(app)
                .post('/api/track/add')
                .set('content-type', 'application/json')
                .send(track);

            // then
            expect(res.status).toBe(200);
        })
    })
    
    describe('/api/track/single/:spotifyId', () => {
        test('should fetch track with specified spotify id', async () => {
            const track: ITrack = {
                spotifyId: "123",
                img: "image.jpg",
                name: "Test Track",
                artist: "Test Artist",
                href: "http://example.com",
                movies: [
                    {
                        id: "movie1",
                        name: "Movie 1",
                        plot: "Plot of Movie 1",
                        year: "2023",
                        img: "movie1.jpg",
                    },
                ],
            };
            await new trackModel(track).save();

            const res = await request(app)
                .get(`/api/track/single/${track.spotifyId}`);
            
            expect(res.status).toBe(200);
            expect(Object.keys(res.body[0]).length).toBeGreaterThan(0);
        })

        test('should fetch empty array', async () => {
            const track: ITrack = {
                spotifyId: "123",
                img: "image.jpg",
                name: "Test Track",
                artist: "Test Artist",
                href: "http://example.com",
                movies: [
                    {
                        id: "movie1",
                        name: "Movie 1",
                        plot: "Plot of Movie 1",
                        year: "2023",
                        img: "movie1.jpg",
                    },
                ],
            };
            await new trackModel(track).save();

            const res = await request(app)
                .get(`/api/track/single/124`);
            
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(0);
        })

        test('should return 404', async () => {
            const track: ITrack = {
                spotifyId: "123",
                img: "image.jpg",
                name: "Test Track",
                artist: "Test Artist",
                href: "http://example.com",
                movies: [
                    {
                        id: "movie1",
                        name: "Movie 1",
                        plot: "Plot of Movie 1",
                        year: "2023",
                        img: "movie1.jpg",
                    },
                ],
            };
            await new trackModel(track).save();

            const res = await request(app)
                .get(`/api/track/single/`);
            
            expect(res.status).toBe(404);
        })
    })
})

