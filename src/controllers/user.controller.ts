/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import UserService from '../services/user.service';

class UsersController {
    public userService = new UserService();

    public getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const findAllUsersData: User[] = await this.userService.findAllUser();

            res.status(200);
            res.json({ data: findAllUsersData, message: 'findAll' });
        } catch (error) {
            res.status(500);
            res.json({ message: error });
        }
    };
}

export default UsersController;
