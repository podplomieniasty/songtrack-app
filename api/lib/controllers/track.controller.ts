import { NextFunction, Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import { ITrack } from "../models/track.model";
import TrackService from "../services/track.service";

class TrackController implements Controller {
    public path: string = '/api/track';
    public router = Router();
    private service = new TrackService();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get(`${this.path}/all`, this.returnAllTracks);
        this.router.post(`${this.path}/add`, this.handleTrackAdd);
    }

    handleTrackAdd = async (req: Request, res: Response, next: NextFunction) => {
        const track: ITrack = {...req.body};
        console.log(track);
        try {
            await this.service.addTrack(track);
            res.status(200).json('Succesfully added trackingo');
        } catch (err) {
            console.error(`Error adding track: `, err);
            res.status(401).json({error: 'Something is not yes'});
        }

    }

    returnAllTracks = async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.service.query({});
        res.status(200).json(result);
    }
}

export default TrackController;