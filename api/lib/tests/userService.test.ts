import UserService from '../services/user.service';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;
let userService: UserService;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  userService = new UserService();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('UserService', () => {
  it('should create a new user', async () => {
    const user = { name: 'Test User', email: 'test@example.com', joined: new Date() }; 
    const createdUser = await userService.createNewOrUpdate(user);

    expect(createdUser).toHaveProperty('_id');
    expect(createdUser.name).toBe('Test User');
    expect(createdUser.email).toBe('test@example.com');
  });

  it('should query user by name', async () => {
    const user = { name: 'Test User', email: 'test@example.com', joined: new Date() };
    await userService.createNewOrUpdate(user);

    const queriedUser = await userService.getByName('Test User');
    expect(queriedUser).not.toBeNull();
    expect(queriedUser.name).toBe('Test User');
  });
});
