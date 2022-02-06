import { Request, Response } from 'express';
import UserController from '../user.controller';

describe('Users controllers', () => {
  const userController: UserController = new UserController();

  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn(),
      json: jest.fn((value) => value),
    };
  });

  test('Should return list of users', async () => {
    const users = [
      {
        id: 1,
        name: 'Roberto',
        email: 'robaraneda@gmail.com',
        password: 'password',
      },
    ];

    const expectedJsonResponse: object = {
      message: 'findAll',
      data: users,
    };

    jest.spyOn(userController.userService, 'findAllUser').mockResolvedValue(users);
    await userController.getUsers(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toBeCalledWith(expectedJsonResponse);
  });

  test('Should return a exception get users', async () => {
    const errorFunction = () => {
      throw new Error();
    };

    jest.spyOn(userController.userService, 'findAllUser').mockImplementation(errorFunction);

    await userController.getUsers(mockRequest as Request, mockResponse as Response);

    expect(errorFunction).toThrow(Error);
  });
});
