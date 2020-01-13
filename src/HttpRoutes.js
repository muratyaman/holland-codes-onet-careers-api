import uuidv4 from 'uuid/v4';
import constants from './constants';
import { asyncForEach } from './utils';

const newHttpRoutes = (config, httpRouter, dbAdapter) => {
  
  const makeListHandler = (name) => {
    return async (req, res) => {
      // TODO: add generic filters, pagination, etc.
      const data = await dbAdapter.table(name);
      res.json({ data });
    };
  };
  
  const makeRetrieveHandler = (name, idField = 'id') => {
    return async (req, res) => {
      // TODO: check ID
      const rows = await dbAdapter.table(name).where(idField, req.params.id);
      const data = rows[0] ? rows[0] : null;
      res.json({ data });
    };
  };
  
  const jobList         = makeListHandler(constants.TBL_JOBS);
  const industryList    = makeListHandler(constants.TBL_INDUSTRIES);
  const jobIndustryList = makeListHandler(constants.TBL_JOBS_INDUSTRIES);
  
  const attachRoutes = () => {
    // intentionally cause side-effects
    httpRouter.get(constants.RUT_JOBS, jobList);
    httpRouter.get(constants.RUT_INDUSTRIES, industryList);
    httpRouter.get(constants.RUT_JOBS_INDUSTRIES, jobIndustryList);
    
    return true;
  };
  
  return {
    routes: {
      jobList,
      industryList,
      jobIndustryList,
    },
    attachRoutes,
  };
};

export default newHttpRoutes;
