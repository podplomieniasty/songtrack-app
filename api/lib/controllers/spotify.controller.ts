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
        this.router.get(`${this.path}/authlogin`, this.authLogin);
        this.router.get(`${this.path}/authcallback`, this.authCallback);
        this.router.get(`${this.path}/token`, this.getToken);
    }

    private authLogin = async (req: Request, res: Response, next: NextFunction) => {
        console.log('AuthLogin hit: trying to login to SpotifyAPI...');
        let scope =     'streaming \
                        user-read-email \
                        user-read-private';
        let state = generateRandomString(16);
        let auth_query_params = new URLSearchParams({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: `http://localhost:${config.port}/api/spotify/authcallback`,
            state: state
        });
        res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_params.toString());
        console.log(auth_query_params.toString());
    }
    
    private authCallback = async (req: Request, res: Response, next: NextFunction) => {
        console.log('AuthCallback hit: trying to fetch acces token...');
        const code = req.query.code;
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: `http://localhost:${config.port}/api/spotify/authcallback`,
                grant_type: 'authorization_code',
            },
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            json: true
        };
        requestLib.post(authOptions, (err, resp, body) => {
            if(!err && resp.statusCode === 200) {
                this.access_token = body.access_token;
                res.redirect('/')
            }
        });
    }

    private getToken = async (req: Request, res: Response, next: NextFunction) => {
        
        res.json({
            access_token: this.access_token
        });
    }

}

export default SpotifyController;