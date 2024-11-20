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
        this.router.get(`${this.path}/single/:spotifyId`, this.returnSingleTrackData);
        this.router.post(`${this.path}/add`, this.handleTrackAdd);
    }

    handleTrackAdd = async (req: Request, res: Response, next: NextFunction) => {
        const track: ITrack = req.body;
        try {
            if((await this.service.query({spotifyId: track.spotifyId})).length != 0) {
                console.log('Now updating track');
                await this.service.updateMovieList(track);
                res.status(200).json('Succesfully updated trackingo');
            } else {
                console.log('Now adding track');
                await this.service.addTrack(track);
                res.status(200).json('Succesfully added trackingo');
            }
        } catch (err) {
            console.error(`Error adding track: `, err);
            res.status(401).json({error: 'Something is not yes'});
        }

    }

    returnAllTracks = async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.service.query({});
        res.status(200).json(result);
    }

    returnSingleTrackData = async (req: Request, res: Response, next: NextFunction) => {
        const { spotifyId } = req.params;
        const result = await this.service.query({spotifyId: spotifyId});
        res.status(200).json(result);
    }
}

export default TrackController;