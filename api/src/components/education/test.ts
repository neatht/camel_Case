// @ts-nocheck

/**
 * File contains unit tests for the education API component.
 */

import { getOwnEducation, getEducation, addEducation, updateEducation, deleteEducation } from './controller';
import { getOwnEducationService, getEducationService, addEducationService, checkEducationService, updateEducationService, deleteEducationService } from './service';
import { checkProfileService, checkPublicService } from '../../helpers/service';
import { isMainThread } from 'worker_threads';
import { hasUncaughtExceptionCaptureCallback } from 'process';

/**
 * Mock the service functions
 */
jest.mock('./service.ts');
jest.mock('../../helpers/service.ts');

/**
 * Mock req, res, next
 */
const mReq = { poolClient: { release: () => { return; }}, body: { data: { educationID: '1337' }}, params: { userID: '6969' }, user: { sub: 'provider|000' } }
const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
const mNext = jest.fn();

/**
 * Fake service results
 */
const education = [{
  institution: 'University of Melbourne',
  qualification: 'Bachelor of Science',
  description: 'Computer science major',
  startDate: 'some date',
  endDate: 'some date',
  educationID: '1337'
}];

/**
 * Tests for getEducation controller
 */
describe('getEducation', () => {
  it('should return 404 error if cannot find profile', async () => {
    checkProfileService.mockImplementation((mReq, mRes, userID) => {
      return false;
    });
    await getEducation(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(404);
  });

  it('should return 401 error if profile exists but is not public', async () => {
    checkProfileService.mockImplementation((mReq, mRes, userID) => {
      return true;
    });
    checkPublicService.mockImplementation((mReq, mRes, userID) => {
      return false;
    });
    await getEducation(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(401);
  });

  it('should return 200 success with education if profile found', async () => {
    checkProfileService.mockImplementation((mReq, mRes, userID) => {
      return true;
    });
    checkPublicService.mockImplementation((mReq, mRes, userID) => {
      return true;
    });
    getEducationService.mockImplementation((mReq, mRes, mNext) => {
      return education;
    });
    await getEducation(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        education: education
      }
    });
  });
});

/**
 * Tests for getOwnEducation controller
 */
describe('getOwnEducation', () => {
  it('should return 404 if cannot find profile', async () => {
    checkProfileService.mockImplementation((mReq, mRes, userID) => {
      return false;
    });
    await getOwnEducation(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(404);
  });

  it('should return 200 success education if profile found', async () => {
    checkProfileService.mockImplementation((mReq, mRes, userID) => {
      return true;
    });
    getOwnEducationService.mockImplementation((mReq, mRes, mNext) => {
      return education;
    });
    await getOwnEducation(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        education: education
      }
    });
  })
});

/**
 * Tests for addEducation controller
 */
describe('addEducation', () => {
  it('should return 404 error if profile not found', async () => {
    checkProfileService.mockImplementation((mReq, mRes, userID) => {
      return false;
    });
    await addEducation(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(404);
  });

  it('should return 200 success with educationID if education successfuly added', async () => {
    checkProfileService.mockImplementation((mReq, mRes, userID) => {
      return true;
    });
    addEducationService.mockImplementation((mReq, mRes, mNext) => {
      return '1337';
    });
    await addEducation(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        educationID: '1337'
      }
    });
  });
});

/**
 * Tests for updateEducation controller
 */
describe('updateUser', () => {
  it('should return 404 error if profile not found', async () => {
    checkProfileService.mockImplementation((mReq, mRes, userID) => {
      return false;
    });
    await updateEducation(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(404);
  });

  it('should return 404 error if profile found but education trying to update does not exist', async () => {
    checkProfileService.mockImplementation((mReq, mRes, userID) => {
      return true;
    });
    checkEducationService.mockImplementation((mReq, mRes, mNext) => {
      return false;
    })
    await updateEducation(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(404);
  })

  it('should return 200 success if education successfully updated', async () => {
    checkProfileService.mockImplementation((mReq, mRes, userID) => {
      return true;
    });
    checkEducationService.mockImplementation((mReq, mRes, mNext) => {
      return true;
    });
    updateEducationService.mockImplementation((mReq, mRes, mNext) => {
      return;
    });
    await updateEducation(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(200);
  });
});

/**
 * Tests for deleteEducation controller
 */
describe('deleteEducation', () => {
  it('should return 404 error if profile not found', async () => {
    checkProfileService.mockImplementation((mReq, mRes, userID) => {
      return false;
    });
    await updateEducation(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(404);
  });

  it('should return 404 error if profile found but education trying to delete does not exist', async () => {
    checkProfileService.mockImplementation((mReq, mRes, userID) => {
      return true;
    });
    checkEducationService.mockImplementation((mReq, mRes, mNext) => {
      return false;
    })
    await updateEducation(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(404);
  })

  it('should return 200 success if education successfully deleted', async () => {
    checkProfileService.mockImplementation((mReq, mRes, userID) => {
      return true;
    });
    checkEducationService.mockImplementation((mReq, mRes, mNext) => {
      return true;
    });
    deleteEducationService.mockImplementation((mReq, mRes, mNext) => {
      return;
    });
    await deleteEducation(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(200);
  });
});