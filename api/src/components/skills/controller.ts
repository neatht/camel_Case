/**
 * This file contains controller functions for the /api/skills endpoint. The
 * controller calls the corresponding service function to execute a database
 * query. Then the controller function will use the result of this call to
 * decide which response to send.
 */

import express from 'express';
import { getSkillsService, updateSkillService, checkOthersProfileService, getOwnSkillsService } from './service';
import { checkProfileService } from '../profile/service'
import dotenv from 'dotenv';
dotenv.config();

/**
 * getSkills() gets a users skills by their ID in the database and sends a JSON response
 * to the client.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */

export const getSkills = async (req: any, res: express.Response, next: express.NextFunction) => {
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
      const result = await getSkillsService(req, res, next);
      req.poolClient.release();
      if (result === null || !result.public) {
        res.status(404);
        return res.json({
          status: 'error',
          message: 'Could not find that users skills.'
        });
      } else {
        res.status(200);
        return res.json({
          status: 'success',
          data: {
            skills: result.skills
          }
        });
      }
    }
  } catch (err) {
    next(err);
  }
}


/**
 * addSkill() adds a new skill to the current user.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */

export const addSkill = async (req: any, res: express.Response, next: express.NextFunction) => {
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
      const result = await getOwnSkillsService(req, res, next);
      const skills : object[] = [];
      if (result === null){
        skills.push(req.body.data.skill);
      } else {
        Array.prototype.push.apply(skills, result.skills);
        skills.push(req.body.data.skill);
      }
      await updateSkillService(req, res, next, skills);
      console.log(`Skill added for userID: ${req.user.sub.split('|')[1]}`);
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
 * deleteSkill() deletes a skill from the current user.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */

export const deleteSkill = async (req: any, res: express.Response, next: express.NextFunction) => {
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
      const result = await getOwnSkillsService(req, res, next);
      const skills : object[] = result.skills;
      if (skills === null){
        req.poolClient.release();
        res.status(404);
        return res.json({
          status: 'error',
          message: 'Skill does not exist.'
        });
      } else {
        const index : number = skills.indexOf(req.body.data.skill);
        if (index === -1){
          req.poolClient.release();
          res.status(404);
          return res.json({
            status: 'error',
            message: 'Skill does not exist.'
          });
        } else {
          skills.splice(index, 1);
          await updateSkillService(req, res, next, skills);
          console.log(`Skill deleted for userID: ${req.user.sub.split('|')[1]}`);
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
 * getOwnSkills() gets all skills from the current user.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */

export const getOwnSkills = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const result = await getOwnSkillsService(req, res, next);
    req.poolClient.release();
      if (result === null) {
        res.status(404);
        return res.json({
          status: 'error',
          message: 'Could not find that users skills.'
        });
      } else {
        res.status(200);
        return res.json({
          status: 'success',
          data: {
            skills: result.skills
          }
        });
      }
  } catch (err) {
    next(err);
  }
}