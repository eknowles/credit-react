import { actionTypes as types } from '../constants';

const report = (state = {}, action) => {
  switch (action.type) {
    case types.CREDIT_REPORT_SUCCESS:
      return action.data;
    case types.CREDIT_REPORT_FAILURE:
      return {};
    default:
      return state;
  }
};

export default report;
