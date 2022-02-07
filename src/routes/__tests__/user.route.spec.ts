import UserRoute from '../user.route';

describe('User Routes', () => {
  const userRoute = new UserRoute();
  const routes = userRoute.router.stack
    .filter((r) => r.route) // take out all the middleware
    .map((r) => {
      return {
        method: Object.keys(r.route.methods)[0].toUpperCase(),
        path: r.route.path,
      };
    });

  it('Route has GET /users', () => {
    const routeExist = routes.some((route) => route.method === 'GET' && route.path === '/users');
    expect(routeExist).toBeTruthy();
  });
});
