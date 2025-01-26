import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import { config } from "../config";
import fetch from 'node-fetch';

require('dotenv').config();

class RAWGController implements Controller {
    public path = '/api/rawg';
    public router = Router();

    constructor() {
        if (!process.env.OMDB_API_KEY) {
            throw new Error('RAWG_API nie działa.');
        }
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:title`, this.getGameByTitle);
    }

    private getGameByTitle = async (req: Request, res: Response) => {
        const { title } = req.params;
        console.log(process.env.RAWG_API_KEY)
        const response = await fetch(
            `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${title}`,
            {
                method: 'GET',
            }
        ).then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ error: 'Wewnętrzny błąd serwera', details: err.message });

        })
    };
}

export default RAWGController;
