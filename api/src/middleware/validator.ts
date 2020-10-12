/**
 * This file contains custom validators to work with the express-validator
 * library.
 */

/**
 * isStrArr() checks whether the array argument is an array and is populated
 * with strings of a specified length. If no length is specified, it does not
 * invalidate strings based on their length. Throws an error if the input array
 * is invalid.
 *
 * @param arr - an Array of strings
 * @param len - the maximum length each string can be (default null if no limit)
 * @returns true if the array is valid
 */
export const isStrArr = (arr: string[], len: number = null) => {
  try {
    Array.isArray(arr);
    return arr.every(x => (typeof x === 'string' &&
      (len == null || x.length <= len)));
  }
  catch {
    throw new Error('Invalid array.')
  }
}

/**
 * isEnum() Checks if a string is in an array of strings.
 *
 * @param arr - an Array of strings
 * @param val - the string to look for in arr
 * @returns true if val is in arr
 */
export const isEnum = (arr: string[], val: string) => {
  return arr.includes(val);
}