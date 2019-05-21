import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();
const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({
  connectionString,
});

export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
