/**
 * This file contains controller functions for the /api/Achievements endpoint. The
 * controller calls the corresponding service function to execute a database
 * query. Then the controller function will use the result of this call to
 * decide which response to send.
 */

import express from 'express';
import { getAchievementsService, updateAchievementService, getOwnAchievementsService } from './service';
import { checkProfileService } from '../profile/service'
import { checkOthersProfileService } from '../achievements/service'
import dotenv from 'dotenv';
dotenv.config();

/**
 * getAchievements() gets a users Achievements by their ID in the database and sends a JSON response
 * to the client.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */

export const getAchievements = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const profileExists: boolean = await checkOthersProfileService(req, res, next, req.params.userID);;
    if (!profileExists){
      req.poolClient.end();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    } else {
      const result = await getAchievementsService(req, res, next);
      req.poolClient.end();
      if (result === null || !result.public) {
        res.status(404);
        return res.json({
          status: 'error',
          message: 'Could not find that users achievements.'
        });
      } else {
        res.status(200);
        return res.json({
          status: 'success',
          data: {
            achievements: result.achievements
          }
        });
      }
    }
  } catch (err) {
    next(err);
  }
}


/**
 * addAchievement() adds a new achievement to the current user.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */

export const addAchievement = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const profileExists: boolean = await checkProfileService(req, res, next);
    if (!profileExists){
      req.poolClient.end();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    } else {
      const result = await getOwnAchievementsService(req, res, next);
      const achievements : object[] = [];
      if (result === null){
        achievements.push(req.body.data.achievement);
      } else {
        Array.prototype.push.apply(achievements, result.achievements);
        achievements.push(req.body.data.achievement);
      }
      await updateAchievementService(req, res, next, achievements);
      console.log(`Achievement added for userID: ${req.user.sub.split('|')[1]}`);
      req.poolClient.end();
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
 * deleteAchievement() deletes a Achievement from the current user.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */

export const deleteAchievement = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const profileExists: boolean = await checkProfileService(req, res, next);
    if (!profileExists){
      req.poolClient.end();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    } else {
      const result = await getOwnAchievementsService(req, res, next);
      const achievements : object[] = result.achievements;
      if (achievements === null){
        req.poolClient.end();
        res.status(404);
        return res.json({
          status: 'error',
          message: 'Achievement does not exist.'
        });
      } else {
        const index : number = achievements.indexOf(req.body.data.achievement);
        if (index === -1){
          req.poolClient.end();
          res.status(404);
          return res.json({
            status: 'error',
            message: 'Achievement does not exist.'
          });
        } else {
          achievements.splice(index, 1);
          await updateAchievementService(req, res, next, achievements);
          console.log(`Achievement deleted for userID: ${req.user.sub.split('|')[1]}`);
          req.poolClient.end();
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
 * getOwnAchievements() gets all Achievements from the current user.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */

export const getOwnAchievements = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const result = await getOwnAchievementsService(req, res, next);
    req.poolClient.end();
      if (result === null) {
        res.status(404);
        return res.json({
          status: 'error',
          message: 'Could not find that users achievements.'
        });
      } else {
        res.status(200);
        return res.json({
          status: 'success',
          data: {
            achievements: result.achievements
          }
        });
      }
  } catch (err) {
    next(err);
  }
}