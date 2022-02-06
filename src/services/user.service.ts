import { User } from '@prisma/client';
import prisma from '../client';

class UserService {
    public users = prisma.user;

    public async findAllUser(): Promise<User[]> {
        const allUser: User[] = await this.users.findMany();
        return allUser;
    }

    public async createUser(user: User): Promise<User> {
        const createdUser: User = await this.users.create({ data: user });

        return createdUser;
    }
}

export default UserService;
