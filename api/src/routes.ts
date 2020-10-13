/**
 * This file is responsible for registering all routes and middleware.
 */

// Library imports
import express from 'express';
import path from 'path';

// Route imports
import profileRouter from './components/profile/routes';
import searchRouter from './components/search/routes';

// Middleware imports
import { jwtCheck } from './middleware/auth';
import { errorHandler } from './middleware/error';

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
  app.use('/api/search', searchRouter);

  // Unauthenticated test route
  app.get('/api/test', (req, res) => {
    res.status(200);
    res.json({
      status: "success",
      data: "Test successful"
    })
  });

  app.get('/api/getEmail', jwtCheck, (req: any, res) => {
    res.json({
      email: req.user["https://example.com/email"]
    });
  })

  // Handle unfound API routes
  app.get("/api/*", (req, res) => {
    res.status(404);
    res.json({
      status: 'error',
      message: 'Route not found. Please check the route is a valid endpoint.'
    })
  })

  // Redirect to React app if not in API path
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname+'../../../client/build/index.html'));
  });

  // Error handling
  app.use(errorHandler);
}