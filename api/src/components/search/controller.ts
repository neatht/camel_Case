import express from 'express';
import { searchProjectService, searchUserService } from './service';
import dotenv from 'dotenv';
dotenv.config();

/**
 * searchProject() searches the databse for a project matching the query
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const searchProject = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    // if query searching for all projects, then use cache
    // const result = await cache.get(
    //   'searchProjectService' + req.params.query.split(' ').join('%'),
    //   async () => {
    //     const queryResult = await searchProjectService(req, res, next);
    //     const rows : object[] = [];

    //     queryResult.rows.forEach((row : any) => {
    //       const builtRow : object = {
    //         project_id: row.project_id,
    //         project_name: row.project_name,
    //         author_first_name: row.first_name,
    //         author_last_name: row.last_name,
    //         user_id: row.user_id
    //       };
    //       rows.push(builtRow);
    //     });

    //     return rows;
    // });

    const queryResult = await searchProjectService(req, res, next);
    const rows : object[] = [];

    queryResult.rows.forEach((row : any) => {
      const builtRow : object = {
        project_id: row.project_id,
        project_name: row.project_name,
        author_first_name: row.first_name,
        author_last_name: row.last_name,
        user_id: row.user_id
      };
      rows.push(builtRow);
    });

    req.poolClient.release();
    res.status(200);
    return res.json(rows);
  } catch (err){
    next(err);
  }
}

/**
 * searchUser() searches the databse for a project matching the query
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const searchUser = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const queryResult = await searchUserService(req, res, next);
    const rows : object[] = [];

    queryResult.rows.forEach((row : any) => {
      const builtRow : object = {
        profile_id: row.user_id,
        first_name: row.first_name,
        last_name: row.last_name,
        profile_picture: 'PLACEHOLDER'
      };
      rows.push(builtRow);
    });

    req.poolClient.release();
    res.status(200);
    return res.json(rows);
  } catch (err) {
    next(err)
  }
}

/**
 * search() searches the databse for a project or user matching the query
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const search = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const projectQueryResult = await searchProjectService(req, res, next);
    const projectRows : object[] = [];

    projectQueryResult.rows.forEach((row : any) => {
      const builtRow : object = {
        type: "Project",
        id: row.project_id,
        name: row.project_name
      };
      projectRows.push(builtRow);
    });

    const userQueryResult = await searchUserService(req, res, next);
    const userRows : object[] = [];

    userQueryResult.rows.forEach((row : any) => {
      const builtRow : object = {
        type: "Profile",
        id: row.project_id,
        name: row.first_name.concat(" ").concat(row.last_name)
      };
      userRows.push(builtRow);
    });

    req.poolClient.release();
    res.status(200);
    return res.json(projectRows.concat(userRows));



  } catch (err) {
    next(err);
  }
}