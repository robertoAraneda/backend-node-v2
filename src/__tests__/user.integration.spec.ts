import prisma from '../client';
import supertest from 'supertest';
import Server from '../server/app';
import UserRoute from '../routes/user.route';
import { User } from '@prisma/client';

export interface PrismaCreateManyResponse {
  count: number;
}

describe('Integration test users', () => {
  const app = new Server([new UserRoute()]);

  const request = supertest(app.getServer());
  let createdUserResponse: PrismaCreateManyResponse;

  beforeAll(async () => {
    // create users
    createdUserResponse = await prisma.user.createMany({
      data: [
        { name: 'Roberto', password: 'password', email: 'roberto@email.com' },
        { name: 'Claudia', password: 'password', email: 'claudia@email.com' },
      ],
    });
  });

  it('should return a list of users', async () => {
    const response = await request.get('/users').expect(200);

    const users: User[] = response.body.data;

    expect(users.length).toEqual(createdUserResponse.count);
    expect(users[0]).toHaveProperty('name', 'Roberto');
  });

  afterAll(async () => {
    const deleteUsers = prisma.user.deleteMany();

    await prisma.$transaction([deleteUsers]);

    await prisma.$disconnect();
  });
});
