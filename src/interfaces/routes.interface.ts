import { Router } from 'express';
import {} from '../client.ts';

export interface RoutesInterface {
  path?: string;
  router: Router;
}
