import express from 'express';
import {config} from './config';
import Controller from 'interfaces/controller.interface';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';


class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.connectToDatabase();

    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    public listen(): void {
        this.app.listen(config.port, () => {
            console.log(`App is listening on port ${config.port}`);
        });
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        })
    }

    private async connectToDatabase(): Promise<void> {
        try {
            await mongoose.connect(config.databaseUrl);
            console.log('Established connection to cloud database');
        } catch (e) {
            console.error('Error connecting to MongoDB:', e);
        }
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
        })
    }

    
}
export default App;
