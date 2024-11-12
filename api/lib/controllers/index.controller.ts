import { Request, Response, Router } from "express";
import Controller from "interfaces/controller.interface";
import path from "path";

class IndexController implements Controller {
    public path = '/';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.serveIndex);
    }

    // PATH HANDLING
    private serveIndex = async (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    }
}

export default IndexController;