import { Router } from 'express';
import UsersController from '../controllers/user.controller';
import { RoutesInterface } from '../interfaces/routes.interface';

class UsersRoute implements RoutesInterface {
    public path = '/users';
    public router = Router();
    public usersController = new UsersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.usersController.getUsers);
    }
}

export default UsersRoute;
