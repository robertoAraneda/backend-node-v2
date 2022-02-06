import { User } from '@prisma/client';
import prisma from '../cliente';

class UserService {
    public users = prisma.user;

    public async findAllUser(): Promise<User[]> {
        const allUser: User[] = await this.users.findMany();
        return allUser;
    }
}

export default UserService;
