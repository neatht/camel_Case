/**
 * This file is responsible for registering all routes and middleware.
 */

// Library imports
import express from 'express';
import path from 'path';

// Route imports
import profileRouter from './components/profile/routes';

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
  // app.use('/db', dbRoutes);
  app.use('/api/profile', profileRouter);
  app.get('/api/getList', jwtCheck, (req, res) => {
    const list = ['item1', 'item2'];
    res.json(list);
  })
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname+'../../../client/build/index.html'));
  });
}