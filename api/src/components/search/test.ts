// @ts-nocheck

/**
 * File contains unit tests for the profile API component.
 */

import { searchProject, searchUser } from './controller';
import { searchProjectService, searchUserService } from './service';



/**
 * Mock the service functions
 */
jest.mock('./service.ts');

/**
 * Mock req, res, next
 */
const mReq = { poolClient: { release: () => { return; }}, user: { sub: 'provider|000' } }
const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
const mNext = jest.fn();

/**
 * Tests for searchProject controller
 */
describe('searchProject', () => {
    it('should return list of projects when given a query', async () => {
        searchProjectService.mockImplementation((mReq, mRes, mNext) => {
            return {
                rows: [{
                    project_id: 'project_id',
                    project_name: 'project_name',
                    first_name: 'first_name',
                    last_name: 'last_name',
                    user_id: 'user_id'
                },]
            };
        });

        await searchProject(mReq, mRes, mNext);

        expect(mRes.status).toHaveBeenCalled();
        expect(mRes.status).toHaveBeenCalledWith(200);

        expect(mRes.json).toHaveBeenCalled();
        expect(mRes.json).toHaveBeenCalledWith([{
            project_id: 'project_id',
            project_name: 'project_name',
            author_first_name: 'first_name',
            author_last_name: 'last_name',
            user_id: 'user_id'
        },]);
    });
});

/**
 * Tests for searchProfile controller
 */
describe('searchUser', () => {
    it('should return list of user profiles when given a query', async () => {
        searchUserService.mockImplementation((mReq, mRes, mNext) => {
            return {
                rows: [{
                    user_id: 'profile_id',
                    first_name: 'first_name',
                    last_name: 'last_name',
                    profile_picture: 'PLACEHOLDER'
                },]
            };
        });

        await searchUser(mReq, mRes, mNext);

        expect(mRes.status).toHaveBeenCalled();
        expect(mRes.status).toHaveBeenCalledWith(200);

        expect(mRes.json).toHaveBeenCalled();
        expect(mRes.json).toHaveBeenCalledWith([{
            profile_id: 'profile_id',
            first_name: 'first_name',
            last_name: 'last_name',
            profile_picture: 'PLACEHOLDER'
        },]);
    });
});