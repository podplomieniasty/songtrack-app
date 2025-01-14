import { NextFunction, Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import { config } from '../config';
import { generateRandomString } from "../utils/string.utils";
import { URLSearchParams } from "url";
import requestLib = require('request');

require('dotenv').config();

class SpotifyController implements Controller {
    public path = '/api/spotify';
    public router = Router();
    private access_token = '';

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get(`${this.path}/authlogin`, this.authLogin);
        // this.router.get(`${this.path}/authcallback`, this.authCallback);
        this.router.get(`${this.path}/token`, this.getToken);
        this.router.get(`${this.path}/search/:track`, this.searchForTrackByName);
    }

    private getToken = async () => {
        const resp = await fetch(config.spotifyApiEndpointToken, {
            method: 'POST',
            body: new URLSearchParams({
                'grant_type': 'client_credentials'
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
            }
        });
        return await resp.json();
    }

    private getTrackByName = async (track: string, token: string) => {
        
        const resp = await fetch(`${config.spotifyApiEndpointSearch}?q=track%3A${track}&type=track&limit=${config.spotifyApiSearchLimit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' +  token}
        });
        return await resp.json();
    }

    private searchForTrackByName = (req: Request, res: Response, next: NextFunction) => {
        const { track } = req.params;
        if(!track) {
            res.status(400).json('No track provided');
        } else {
            this.getToken().then(response => {
                this.getTrackByName(track, response.access_token).then(data => {
                    res.status(200).json(data);
                })
            })
        }
        
    }

}

export default SpotifyController;