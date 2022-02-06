import { User } from '@prisma/client';
import prisma from '../cliente';

class UserService {
  public users = prisma.user;

  public async findAllUser(): Promise<User[]> {
    return await this.users.findMany();
  }
}

export default UserService;
