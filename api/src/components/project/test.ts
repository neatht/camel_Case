// @ts-nocheck

import {
  uploadS3,
  addMediaToProject,
  deleteProject,
  updateProject,
  addProject,
  getProjectById,
  getMediaFromProject
} from './controller';
import { checkProfileService, checkPublicService } from '../../helpers/service';
import {
  addMediaService,
  addProjectMediaService,
  deleteProjectService,
  updateProjectService,
  addProjectService,
  getProjectMediaService,
  getProjectService
} from './service';

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

const mediaResult = {
  datePosted: 'datePosted',
  projectID: 0,
  mediaID: 'mediaID',
  mediaType: 'mp4',
  userID: 'userID',
  mediaName: 'mediaName'
}

/**
 * Tests for getMediaFromProject
 */

describe('getMediaFromProject', () => {
  it('should return 404 error if cannot find profile', async () => {
    const mReq = Object.assign({}, req);
    const mRes = Object.assign({}, res);
    const mNext = Object.assign({}, next);
    mReq.params = {userID: 'userID'}

    checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return false;
    });

    await getMediaFromProject(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(404);
    expect(mRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile does not exist'
    })
  });

  it('should return 401 error if profile is set to private', async () => {
    const mReq = Object.assign({}, req);
    const mRes = Object.assign({}, res);
    const mNext = Object.assign({}, next);
    mReq.params = {userID: 'userID'}

    checkProfileService.mockImplementation((mReq, mNext, userID) => {
      return true;
    });

    checkPublicService.mockImplementation((mReq, mNext, userID) => {
      return false;
    })

    await getMediaFromProject(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(401);
    expect(mRes.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'profile is private'
    });
  });

  it('should return media for a project if profile is public', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.params = {userID: 'userID'}

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return true;
      });

      checkPublicService.mockImplementation((mReq, mNext, userID) => {
        return true;
      });

      getProjectMediaService.mockImplementation((mReq, mRes, mNext) => {
        return [mediaResult];
      });

      await getMediaFromProject(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'success',
        data: [mediaResult]
      });
  });
});

describe('getProjectById', () => {
  it('should return 404 error if cannot find profile', async () => {
    const mReq = Object.assign({}, req);
    const mRes = Object.assign({}, res);
    const mNext = Object.assign({}, next);
    mReq.params = {userID: 'userID'}

    checkProfileService.mockImplementation((mReq, mNext, userID) => {
      return false;
    });

    await getProjectById(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(404);
    expect(mRes.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Profile does not exist'
    })
  });

  it('should return 401 error if profile is set to private', async () => {
    const mReq = Object.assign({}, req);
    const mRes = Object.assign({}, res);
    const mNext = Object.assign({}, next);
    mReq.params = {userID: 'userID'}

    checkProfileService.mockImplementation((mReq, mNext, userID) => {
      return true;
    });

    checkPublicService.mockImplementation((mReq, mNext, userID) => {
      return false;
    })

    await getProjectById(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(401);
    expect(mRes.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'profile is private'
    });
  });

  it('should return project details if profile is public', async () => {
    const mReq = Object.assign({}, req);
    const mRes = Object.assign({}, res);
    const mNext = Object.assign({}, next);
    mReq.params = {userID: 'userID'}

    checkProfileService.mockImplementation((mReq, mNext, userID) => {
      return true;
    });

    checkPublicService.mockImplementation((mReq, mNext, userID) => {
      return true;
    });

    getProjectService.mockImplementation((mReq, mRes, mNext) => {
      return [mediaResult];
    });

    await getProjectById(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.json).toHaveBeenCalledWith({
      status: 'success',
      data: [mediaResult]
    });
  });
});

describe('getProjectById', () => {
    it('should return 404 error if cannot find profile', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.params = {userID: 'userID'}

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return false;
      });

      await getProjectById(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile does not exist'
      })
    });

    it('should return 401 error if profile is set to private', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.params = {userID: 'userID'}

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return true;
      });

      checkPublicService.mockImplementation((mReq, mNext, userID) => {
        return false;
      })

      await getProjectById(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(401);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'profile is private'
      });
    });

    it('should return project details if profile is public', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.params = {userID: 'userID'}

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return true;
      });

      checkPublicService.mockImplementation((mReq, mNext, userID) => {
        return true;
      });

      getProjectService.mockImplementation((mReq, mRes, mNext) => {
        return [mediaResult];
      });

      await getProjectById(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'success',
        data: [mediaResult]
      });
    });
});

describe('addProject', () => {
    it('should return 404 error if cannot find profile', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.body = {data: projectResult};

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return false;
      });

      await addProject(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile does not exist'
      })
    });

    it('should add project to DB', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.body = {data: projectResult};

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return true;
      });

      addProjectService.mockImplementation((mReq, mRes, mNext) => {
        return null;
      });

      await addProject(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'success'
      });
    });
});

describe('updateProject', () => {
    it('should return 404 error if cannot find profile', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.body = {data: projectResult};

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return false;
      });

      await updateProject(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile does not exist'
      })
    });

    it('should update project in DB', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.body = {data: projectResult};

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return true;
      });

      updateProjectService.mockImplementation((mReq, mRes, mNext) => {
        return null;
      });

      await updateProject(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'success'
      });
    });
});

describe('deleteProject', () => {
    it('should return 404 error if cannot find profile', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.body = {data: projectResult};

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return false;
      });

      await deleteProject(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile does not exist'
      })
    });

    it('should delete project and respond 200', async () => {
      const mReq = Object.assign({}, req);
      const mRes = Object.assign({}, res);
      const mNext = Object.assign({}, next);
      mReq.body = {data: projectResult};

      checkProfileService.mockImplementation((mReq, mNext, userID) => {
        return true;
      });

      deleteProjectService.mockImplementation((mReq, mRes, mNext) => {
        return null;
      });

      await deleteProject(mReq, mRes, mNext);
      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.json).toHaveBeenCalledWith({
        status: 'success'
      });
    });
});