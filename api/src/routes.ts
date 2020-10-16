/**
 * This file is responsible for registering all routes and middleware.
 */

// Library imports
import express from 'express';
import path from 'path';

// Route imports
import profileRouter from './components/profile/routes';
import uploadRouter from './components/project/routes';

// Middleware imports
import { jwtCheck } from './middleware/auth';

/**
 * register() registers the routes and middleware. To add a route or middleware
 * simply append it to the body of the function.
 *
 * @param app - an express Application
 */
export const register = (app: express.Application) => {
  // Register middleware
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.use(express.json());

  // Register routes
  app.use('/api/profile', profileRouter);
  app.use('/api/upload', uploadRouter);
  app.get('/api/getList', jwtCheck, (req: any, res) => {
    console.log(JSON.stringify(req.user));
    const list = ['item1', 'item2'];
    res.json(list);
  });
  app.post('/api/test', (req: any, res: any) => {
    console.log(JSON.stringify(req.body));
  });
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname+'../../../client/build/index.html'));
  // });
}