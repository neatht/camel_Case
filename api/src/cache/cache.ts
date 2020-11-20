import CacheService from './service';

const profileTtl = 60 * 60 * 1;
const ttl = 60 * 5 * 1;
const ownProfileTtl = 60 * 168 * 1;
export const profileCache = new CacheService(profileTtl, 'profileCache');
export const mediaCache = new CacheService(ttl, 'mediaCache');
export const projectCache = new CacheService(ttl, 'projectCache');
export const ownProfileCache = new CacheService(ownProfileTtl, 'ownProfileCache');