// @ts-nocheck

import {
    getDisplayPhotoById, getOwnDisplayPhoto, deleteDisplayPhoto } from './controller';
import { checkProfileService } from '../../helpers/service';
import { deleteDisplayPhotoService, getDisplayPhotoService } from './service';

/**
 * Mock service functions
 */

jest.mock('./service.ts');
jest.mock('../../helpers/service.ts');

/**
 * Mock req, res, next
 */
const req = { poolClient: { release: () => { return; }}, user: { sub: 'provider|000' } }
const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
const next = jest.fn();

/**
 * Fake project and media result
 */
const projectResult = {
  tags: ['tag'],
  location: 'location',
  projectName: 'projectName',
  link: 'link',
  userID: 'userID',
  projectType: 'website',
  views: 0,
  datePosted: 'datePosted',
  projectID: 0
}

const dpResult = {
  datePosted: 'datePosted',
  link: 'link',
  mediaID: 'mediaID',
  mediaType: 'jpg',
  userID: 'userID',
}
describe('getOwnDisplayPhoto', () => {
    it('should return 404 error if cannot find profile', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.params = { userID: 'userID' };

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return false;
      });

      await getOwnDisplayPhoto(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile does not exist'
      })
    });

    it('should return owner\'s own display photo and respond 200', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.params = { userID: 'userID' };

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return true;
      });

      getDisplayPhotoService.mockImplementation((mReq, mRes, mNext) => {
        return dpResult;
      });

      await getOwnDisplayPhoto(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'success',
        data: dpResult
      });
    });
});

describe('getDisplayPhotoById', () => {
    it('should return 404 error if cannot find profile', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.params = { userID: 'userID' };

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return false;
      });

      await getDisplayPhotoById(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile does not exist'
      })
    });

    it('should return a user\'s display photo and respond 200', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.params = { userID: 'userID' };

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return true;
      });

      getDisplayPhotoService.mockImplementation((mReq, mRes, mNext) => {
        return dpResult;
      });

      await getDisplayPhotoById(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'success',
        data: dpResult
      });
    });
});

describe('deleteDisplayPhoto', () => {
    it('should return 404 error if cannot find profile', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.body = { data: {} };

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return false;
      });

      await deleteDisplayPhoto(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile does not exist'
      })
    });

    it('should delete owner\'s display photo and respond 200', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.body = { data: {} };

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return true;
      });

      deleteDisplayPhotoService.mockImplementation((mReq, mRes, mNext) => {
        return null;
      });

      await deleteDisplayPhoto(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'success'
      });
    });
});