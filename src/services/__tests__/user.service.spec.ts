import { prismaMock } from '../../singleton';
import UserService from '../user.service';

const userService: UserService = new UserService();

test('should get a list of users', async () => {
  const users = [
    {
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
      password: 'true',
    },
  ];

  prismaMock.user.findMany.mockResolvedValue(users);

  await expect(userService.findAllUser()).resolves.toEqual([
    {
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
      password: 'true',
    },
  ]);
});
