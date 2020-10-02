import pg from 'pg';
const pool = new pg.Pool()

export const query = (text: string, params: string[],
  callback: (err: Error, res: pg.QueryResult<any>) => void) => {
    return pool.query(text, params, callback)
  }