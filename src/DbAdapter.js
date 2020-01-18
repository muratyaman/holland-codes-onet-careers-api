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
  const jobs                     = () => table(constants.TBL_JOBS);
  const sectors                  = () => table(constants.TBL_SECTORS);
  const subsectors               = () => table(constants.TBL_SUBSECTORS);
  const qualifications           = () => table(constants.TBL_QUALIFICATIONS);
  const jobsSubSectors           = () => table(constants.TBL_JOBS_SUBSECTORS);
  const subSectorsQualifications = () => table(constants.TBL_SUBSECTORS_QUALIFICATIONS);
  
  return {
    db,
    query,
    table,
    jobs,
    sectors,
    subsectors,
    jobsSubSectors,
    subSectorsQualifications,
  };
};

export default newDbAdapter;
