import { actionTypes as types, urls } from '../constants';
import { get } from '../helpers';

export const getCreditReport = () => (dispatch, getState) => {
  dispatch({type: types.CREDIT_REPORT_REQUEST});
  get({
    url: urls.REPORT_INFO,
    success: types.CREDIT_REPORT_SUCCESS,
    failure: types.CREDIT_REPORT_FAILURE,
    dispatch,
  });
};
