import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import PasswordService from '../services/password.service';
import PasswordModel from '../models/password.model';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');
const bcryptHashMock = bcrypt.hash as jest.Mock;

let mongoServer: MongoMemoryServer;
let passwordService: PasswordService;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(() => {
    passwordService = new PasswordService();
    bcryptHashMock.mockReset(); 
});

afterEach(async () => {
    await PasswordModel.deleteMany(); 
});

describe('PasswordService', () => {
    test('should create a new password if no existing password is found', async () => {
        const userId = new mongoose.Types.ObjectId();
        const password = 'newPassword';

        const result = await passwordService.createOrUpdate({ userId, password });

        expect(result).toBeDefined();
        expect(result.password).toBe(password);

        const passwordInDb = await PasswordModel.findOne({ userId });
        expect(passwordInDb).not.toBeNull();
        expect(passwordInDb?.password).toBe(password);
    });

    test('should update an existing password if user already has a password', async () => {
        const userId = new mongoose.Types.ObjectId();
        const oldPassword = 'oldPassword';
        const newPassword = 'newPassword';

        await new PasswordModel({ userId, password: oldPassword }).save();

        const result = await passwordService.createOrUpdate({ userId, password: newPassword });

        expect(result).toBeDefined();
        expect(result.password).toBe(newPassword);

        const passwordInDb = await PasswordModel.findOne({ userId });
        expect(passwordInDb?.password).toBe(newPassword);
    });

    test('should authorize with the correct password', async () => {
        const userId = new mongoose.Types.ObjectId();
        const password = 'correctPassword';

        await new PasswordModel({ userId, password }).save();

        const result = await passwordService.authorize(userId.toString(), password);

        expect(result).toBe(true);
    });

    test('should fail authorization with incorrect password', async () => {
        const userId = new mongoose.Types.ObjectId();
        const correctPassword = 'correctPassword';
        const incorrectPassword = 'wrongPassword';

        await new PasswordModel({ userId, password: correctPassword }).save();

        const result = await passwordService.authorize(userId.toString(), incorrectPassword);

        expect(result).toBeUndefined();
    });

    test('should hash the password correctly', async () => {
        const plainPassword = 'plainPassword';
        const hashedPassword = 'hashedPassword';

        bcryptHashMock.mockResolvedValue(hashedPassword);

        const result = await passwordService.hashPassword(plainPassword);

        expect(result).toBe(hashedPassword);
        expect(bcryptHashMock).toHaveBeenCalledWith(plainPassword, 10);
    });
});
