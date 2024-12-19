import { NextFunction, Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import UserService from "../services/user.service";
import PasswordService from "../services/password.service";
import TokenService from "../services/token.service";
import { auth } from "../middlewares/auth.middleware";

class UserController implements Controller {
    public path: string = '/api/user';
    public router = Router();

    private userService = new UserService();
    private passwordService = new PasswordService();
    private tokenService = new TokenService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createOrUpdate);
        this.router.post(`${this.path}/auth`, this.authenticate);
        this.router.delete(`${this.path}/logout/:userId`, /*auth,*/ this.removeHashSession);
    }

    private authenticate = async (req: Request, res: Response, next: NextFunction) => {
        const { name, password } = req.body;
        try {
            const user = await this.userService.getByName(name);
            if(!user) {
                console.log('brak uzytkownika');
                res.status(200).json({code: 2137, error: 'Unauthorized'});
            } else {
                const authorized = await this.passwordService.authorize(user.id, password);
                if(authorized) {
                    console.log('auth success');
                    const token = await this.tokenService.create(user);
                    res.status(200).json(this.tokenService.getToken(token));
                } else {
                    console.log('auth failed');
                    res.status(200).json({status: 2138, error: 'Invalid password'});
                }
                
            }
        } catch (error) {
            console.error(`UserController: Błąd walidacji. `, error);
            res.status(401).json({error: 'Unauthorized'});
        }
    }

    private createOrUpdate = async (req: Request, res: Response, next: NextFunction) => {
        const userData = req.body;
        try {
            const u = await this.userService.getByName(userData.name);
            if(u) {
                console.log(u);
                res.status(200).json({code: 2137, msg: 'User exists'});
            } else {
                const user = await this.userService.createNewOrUpdate(userData);
                if(userData.password) {
                    const hashedPassword = await this.passwordService.hashPassword(userData.password);
                    await this.passwordService.createOrUpdate({
                        userId: user._id,
                        password: hashedPassword
                    });
                }
                res.status(200).json(user);
            }
            
        } catch (error) {
            console.error(`UserController: Błąd walidacji. `, error);
            res.status(400).json({error: 'Bad request', value: error.message});
        }
    }

    private removeHashSession = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        try {
            const result = await this.tokenService.remove(userId);
            res.status(200).json(result);
        } catch (error) {
            console.error(`UserController: Błąd walidacji. `, error);
            res.status(401).json({error: 'Unauthorized'});
        }
    }
}

export default UserController;