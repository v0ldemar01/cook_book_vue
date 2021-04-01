import { Express } from 'express';
import recipesRoute from './recipesRoute';

const routes = (app: Express) => {
  app.use('/api/recipes', recipesRoute);
};

export default routes;
