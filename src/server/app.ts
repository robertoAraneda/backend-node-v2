import express, { Application } from 'express';
import dotenv from 'dotenv';
import { RoutesInterface } from '../interfaces/routes.interface';

class Server {
  public application: Application;

  public port: number | string;

  constructor(routes: RoutesInterface[]) {
    this.application = express();
    this.port = process.env.PORT || 3000;
    this.init();
    this.routes(routes);
  }

  public getServer() {
    return this.application;
  }

  private init() {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      console.log('init server in development mode');
      dotenv.config({ path: '.env.development' });
    } else if (process.env.NODE_ENV === 'test') {
      console.log('init server in test mode');
      dotenv.config({ path: '.env.test' });
    } else {
      console.log('init server in production mode');
      dotenv.config({ path: '.env.production' });
    }
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: true }));
  }

  private routes(routes: RoutesInterface[]) {
    routes.forEach((route) => {
      this.application.use('/', route.router);
    });
  }

  public run() {
    const showRun = () => {
      console.log(`Server run on port ${this.port}`);
      console.log(`The connection URL is ${process.env.DATABASE_URL}`);
    };
    this.application.listen(this.port, showRun);
  }
}

export default Server;
