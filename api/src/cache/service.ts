/* Service to create cache storage for API endpoints */
import NodeCache from 'node-cache';

export default class CacheService {
  cache: NodeCache;
  name: string;

  constructor(ttlSec: number, name: string = 'Cache') {
    this.cache = new NodeCache({ stdTTL: ttlSec, checkperiod: ttlSec * 0.2, useClones: false });
    this.name = name;
  }

  get(key: string, storeCallback: () => Promise<any>) {
    const value: any = this.cache.get(key);

    if (value) {
      console.log(`${this.name}: key ${key} exists in cache. Retrieving from cache...`)
      return Promise.resolve(value);
    }

    console.log(`${this.name}: key ${key} doesn't exist in cache. Accessing DB and storing in cache...`)

    return storeCallback().then(res => {
      this.cache.set(key, res);
      return res;
    })
  }

  set(key: string, obj: any) {
    console.log(`${this.name}: key ${key} SET in cache`)
    this.cache.set(key, obj);
  }

  del(key: string) {
    console.log(`${this.name}: key ${key} DELETED from cache`)
    this.cache.del(key);
  }

  delStartsWith(startStr: string = '') {
    if (!startStr) {
      return;
    }

    const keys = this.cache.keys();

    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key);
      }
    }
  }

  flush() {
    this.cache.flushAll();
  }
}
