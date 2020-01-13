import knex from 'knex';

const constants = require('./constants');

const newDbAdapter = ({ client, connection }, logger) => {
  
  const db = knex({
    client, // 'mssql',
    connection,
    pool: { min: 1, max: 5 },
    acquireConnectionTimeout: 10000,
  });
  
  /**
   * Run a raw SQL command
   * @param {string} sql e.g. 'select * from users where id = ?',
   * @param {array} params e.g. [ 1 ]
   * @returns {Knex.Raw<any>}
   */
  const query = (sql, params) => db.raw(sql, params);
  
  const table = (name) => db.select().table(name);
  
  // selectors with explicit table names
  const jobs           = () => table(constants.TBL_JOBS);
  const industries     = () => table(constants.TBL_INDUSTRIES);
  const jobsIndustries = () => table(constants.TBL_JOBS_INDUSTRIES);
  
  return {
    db,
    query,
    table,
    jobs,
    industries,
    jobsIndustries,
  };
};

export default newDbAdapter;
