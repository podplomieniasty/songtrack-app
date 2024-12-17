import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import { config } from "../config";
import fetch from 'node-fetch';

require('dotenv').config();

class OMDBController implements Controller {
    public path = '/api/omdb';
    public router = Router();

    constructor() {
        if (!process.env.OMDB_API_KEY) {
            throw new Error('OMDB_API_KEY nie działa');
        }
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/movie/:title`, this.getMovieByTitle);
    }

    private getMovieByTitle = async (req: Request, res: Response) => {
        try {
            const { title } = req.params;
            const url = `http://www.omdbapi.com/?t=${title}&plot=full&apikey=${process.env.OMDB_API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                return res.status(response.status).json({ error: `OMDB API error: ${response.statusText}` });
            }

            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Wewnętrzny błąd serwera', details: error.message });
        }
    };
}

export default OMDBController;
