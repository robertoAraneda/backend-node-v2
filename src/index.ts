import UserRoute from './routes/user.route';
import Server from './server/app';

const app = new Server([new UserRoute()]);

app.run();
