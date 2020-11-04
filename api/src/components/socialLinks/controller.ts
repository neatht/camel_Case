/**
 * This file contains controller functions for the /api/Links endpoint. The
 * controller calls the corresponding service function to execute a database
 * query. Then the controller function will use the result of this call to
 * decide which response to send.
 */

import express from 'express';
import { getLinksService, updateLinkService, checkOthersProfileService, getOwnLinksService } from './service';
import { checkProfileService } from '../profile/service'
import dotenv from 'dotenv';
dotenv.config();

/**
 * getLinks() gets a users social links by their ID in the database and sends a JSON response
 * to the client.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */

export const getLinks = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const profileExists: boolean = await checkOthersProfileService(req, res, next, req.params.userID);;
    if (!profileExists){
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    } else {
      const result = await getLinksService(req, res, next);
      req.poolClient.release();
      if (result === null || !result.public) {
        res.status(404);
        return res.json({
          status: 'error',
          message: 'Could not find that users links.'
        });
      } else {
        res.status(200);
        return res.json({
          status: 'success',
          data: {
            links: result.social_links
          }
        });
      }
    }
  } catch (err) {
    next(err);
  }
}


/**
 * addLink() adds a new social link to the current user.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */

export const addLink = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const profileExists: boolean = await checkProfileService(req, res, next);
    if (!profileExists){
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    } else {
      const result = await getOwnLinksService(req, res, next);
      const links : object[] = [];
      if (result === null){
        links.push(req.body.data.link);
      } else {
        Array.prototype.push.apply(links, result.social_links);
        links.push(req.body.data.link);
      }
      await updateLinkService(req, res, next, links);
      console.log(`Link added for userID: ${req.user.sub.split('|')[1]}`);
      req.poolClient.release();
      res.status(200);
      return res.json({
        status: 'success'
      });
    }
  } catch (err){
    next(err);
  }
}

/**
 * deleteLink() deletes a social link from the current user.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */

export const deleteLink = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const profileExists: boolean = await checkProfileService(req, res, next);
    if (!profileExists){
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    } else {
      const result = await getOwnLinksService(req, res, next);
      const links : object[] = result.social_links;
      if (links === null){
        req.poolClient.release();
        res.status(404);
        return res.json({
          status: 'error',
          message: 'Link does not exist.'
        });
      } else {
        const index : number = links.indexOf(req.body.data.link);
        if (index === -1){
          req.poolClient.release();
          res.status(404);
          return res.json({
            status: 'error',
            message: 'Link does not exist.'
          });
        } else {
          links.splice(index, 1);
          await updateLinkService(req, res, next, links);
          console.log(`Link deleted for userID: ${req.user.sub.split('|')[1]}`);
          req.poolClient.release();
          res.status(200);
          return res.json({
            status: 'success'
          });
        }
      }
    }
  } catch (err){
    next(err);
  }
}

/**
 * getOwnLinks() gets all social links from the current user.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */

export const getOwnLinks = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const result = await getOwnLinksService(req, res, next);
    req.poolClient.release();
      if (result === null) {
        res.status(404);
        return res.json({
          status: 'error',
          message: 'Could not find that users links.'
        });
      } else {
        res.status(200);
        return res.json({
          status: 'success',
          data: {
            links: result.social_links
          }
        });
      }
  } catch (err) {
    next(err);
  }
}