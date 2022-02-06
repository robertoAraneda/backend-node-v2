import { Router } from 'express';
import {} from '../client';

export interface RoutesInterface {
  path?: string;
  router: Router;
}
