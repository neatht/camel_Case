/**
 * This file is responsible for registering all routes and middleware.
 */

// Library imports
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

// Route imports
import profileRouter from './components/profile/routes';
import searchRouter from './components/search/routes';
import skillsRouter from './components/skills/routes';
import achievementsRouter from './components/achievements/routes';
import linksRouter from './components/socialLinks/routes';
import projectRouter from './components/project/routes';
import experienceRouter from './components/experience/routes';
import educationRouter from './components/education/routes';
import mediaRouter from './components/media/routes';
import { connectPool } from './middleware/db';

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
  app.use(express.json({limit: '25mb'}));
  app.use(express.urlencoded({extended: true, limit: '25mb'}));

  // Register routes
  app.use('/api/profile', profileRouter);
  app.use('/api/search', searchRouter);
  app.use('/api/skills', skillsRouter);
  app.use('/api/achievements', achievementsRouter);
  app.use('/api/links', linksRouter);
  app.use('/api/project', projectRouter);
  app.use('/api/experience', experienceRouter);
  app.use('/api/education', educationRouter);
  app.use('/api/media', mediaRouter);

  // authenticated test route
  app.get('/api/test', jwtCheck, (req:any, res) => {
    console.log(req.user);
    res.status(200);
    res.json({
      status: "success",
      data: "Test successful"
    })
  });

  app.get('/api/test/noAuth', connectPool, (req: any, res) => {
    req.poolClient.release();
    res.status(200);
    res.json({
      status: "success",
      data: "Test successful"
    })
  })

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