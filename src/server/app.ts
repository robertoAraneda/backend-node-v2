import express, { Application } from 'express';
import { RoutesInterface } from '../interfaces/routes.interface';


class Server {
    public application: Application;

    public port: number | string;

    constructor(routes: RoutesInterface[]) {
        this.application = express();
        this.port =  3000;
        this.init();
        this.routes(routes);
    }

    public getServer() {
        return this.application;
    }

    private init() {
        this.application.use(express.json());
        this.application.use(express.urlencoded({ extended: true }));
    }

    private routes(routes: RoutesInterface[]) {
        routes.forEach((route) => {
            this.application.use('/', route.router);
        });
    }

    public run() {
        const showRun = () => {
            console.log(`Server run on port ${this.port}`);
        };
        this.application.listen(this.port, showRun);
    }
}

export default Server;
