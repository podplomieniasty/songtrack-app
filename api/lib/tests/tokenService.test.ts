import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import TokenService from '../services/token.service';
import TokenModel from '../models/token.model';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('TokenService', () => {
    let tokenService: TokenService;

    beforeEach(() => {
        tokenService = new TokenService();
    });

    afterEach(async () => {
        await TokenModel.deleteMany(); 
    });

    test('should create a token for a user', async () => {
        const user = {
            id: new mongoose.Types.ObjectId().toHexString(),
            email: 'user@example.com',
            isAdmin: false
        };

        const result = await tokenService.create(user);

        expect(result).toBeDefined();
        expect(result.userId.toString()).toEqual(user.id);
        expect(result.type).toBe('authorization');
        expect(result.value).toBeDefined();

        const tokenInDb = await TokenModel.findOne({ userId: user.id });
        expect(tokenInDb).not.toBeNull();
    });

    test('should remove a token by userId', async () => {
        const userId = new mongoose.Types.ObjectId().toHexString();

        
        await new TokenModel({
            userId,
            type: 'authorization',
            value: 'test-token',
            createDate: Date.now()
        }).save();

        const result = await tokenService.remove(userId);

        expect(result.deletedCount).toBe(1);

        const tokenInDb = await TokenModel.findOne({ userId });
        expect(tokenInDb).toBeNull();
    });

    test('should get a userId by token', async () => {
        const tokenValue = 'test-token';
        const userId = new mongoose.Types.ObjectId();

        
        await new TokenModel({
            userId,
            type: 'authorization',
            value: tokenValue,
            createDate: Date.now()
        }).save();

        const result = await tokenService.getUserIdByToken(tokenValue);

        expect(result).toHaveLength(1);
        expect(result[0].userId.toString()).toEqual(userId.toString());
    });
});
