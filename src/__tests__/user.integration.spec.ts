import prisma from '../client';
import supertest from 'supertest';
import Server from '../server/app';
import UserRoute from '../routes/user.route';

describe('Integration test users', () => {
  const app = new Server([new UserRoute()]);

  const request = supertest(app.getServer());

  beforeAll(async () => {
    // create users
    const users = await prisma.user.createMany({
      data: [
        { name: 'Roberto', password: 'password', email: 'roberto@email.com' },
        { name: 'Claudia', password: 'password', email: 'claudia@email.com' },
      ],
    });
    console.log(users);

    console.log('✨ 2 users successfully created!');
  });

  it('should return a list of users', async () => {
    const response = await request.get('/users');
    console.log(process.env.DATABASE_URL);

    console.dir(response.body);
  });

  afterAll(async () => {
    const deleteUsers = prisma.user.deleteMany();

    await prisma.$transaction([deleteUsers]);

    await prisma.$disconnect();
  });
});
