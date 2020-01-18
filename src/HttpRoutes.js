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
  
  const jobList                    = makeListHandler(constants.TBL_JOBS);
  const sectorList                 = makeListHandler(constants.TBL_SECTORS);
  const subSectorList              = makeListHandler(constants.TBL_SUBSECTORS);
  const qualificationList          = makeListHandler(constants.TBL_QUALIFICATIONS);
  const jobSubSectorList           = makeListHandler(constants.TBL_JOBS_SUBSECTORS);
  const subSectorQualificationList = makeListHandler(constants.TBL_SUBSECTORS_QUALIFICATIONS);
  
  const attachRoutes = () => {
    // intentionally cause side-effects
    httpRouter.get(constants.RUT_JOBS, jobList);
    httpRouter.get(constants.RUT_SECTORS, sectorList);
    httpRouter.get(constants.RUT_SUBSECTORS, subSectorList);
    httpRouter.get(constants.RUT_QUALIFICATIONS, qualificationList);
    httpRouter.get(constants.RUT_JOBS_SUBSECTORS, jobSubSectorList);
    httpRouter.get(constants.RUT_SUBSECTORS_QUALIFICATIONS, subSectorQualificationList);
    
    return true;
  };
  
  return {
    routes: {
      jobList,
      sectorList,
      subSectorList,
      qualificationList,
      jobSubSectorList,
      subSectorQualificationList,
    },
    attachRoutes,
  };
};

export default newHttpRoutes;
