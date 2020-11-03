// @ts-nocheck
import { getUser } from './controller';
import { getProfileService } from './service.ts';

/**
 * Mock the service functions
 */
jest.mock('./service.ts');

/**
 * Mock req, res, next
 */
const mReq = { poolClient: { end: () => { return; }} }
const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
const mNext = jest.fn();

/**
 * Fake service result
 */
const result = {
  first_name: 'firstName',
  last_name: 'lastName',
  bio: 'bio',
  location: 'location',
  looking_for_work: true,
  public: true,
  gender: 'male',
  date_of_birth: '2020-01-01',
  public_location: true
};

/**
 * Tests for getUser function
 */
describe('getUser', () => {
  it('should return 404 error if cannot find profile', async () => {
    getProfileService.mockImplementation((mReq, mRes, mNext) => {
      return null;
    });
    await getUser(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(404);
  });

  it('should return limited profile information if set to private', async () => {
    result.public = false;
    getProfileService.mockImplementation((mReq, mRes, mNext) => {
      return result;
    });
    await getUser(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        firstName: result.first_name,
        lastName: result.last_name,
        public: result.public
      }
    });
  });

  it('should return full profile information with location if profile and location are both public', async () => {
    result.public = true;
    result.public_location = true;
    getProfileService.mockImplementation((mReq, mRes, mNext) => {
      return result;
    });
    await getUser(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        firstName: result.first_name,
        lastName: result.last_name,
        bio: result.bio,
        location: result.location,
        lookingForWork: result.looking_for_work,
        public: result.public,
        gender: result.gender,
        DOB: result.date_of_birth,
        publicLocation: result.public_location
      }
    });
  });

  it('should return full profile information without location if profile is public and location is private', async () => {
    result.public = true;
    result.public_location = false;
    getProfileService.mockImplementation((mReq, mRes, mNext) => {
      return result;
    });
    await getUser(mReq, mRes, mNext);
    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        firstName: result.first_name,
        lastName: result.last_name,
        bio: result.bio,
        lookingForWork: result.looking_for_work,
        public: result.public,
        gender: result.gender,
        DOB: result.date_of_birth,
        publicLocation: result.public_location
      }
    });
  });
});