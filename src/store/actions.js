import npmService from '../services/npmservice';

/**
 * Action types
 */
export const DOWNLOADS_REQUESTED = 'DOWNLOADS_REQUESTED';
export const DOWNLOADS_RECEIVED = 'DOWNLOADS_RECEIVED';

export const downloadsRangesRequested = packageId => ({
  type: DOWNLOADS_REQUESTED,
  packageId,
});

export const downloadsRangesReceived = (packageId, data) => ({
  type: DOWNLOADS_RECEIVED,
  packageId,
  data,
});

/**
 * Async get downloads ranges by package.
 */
export const getDownloadsRanges = (packageId, dateFrom = null, dateTo = null) => async (dispatch, getState) => {
  const state = getState();
  if (!state.isFetching) {
    // dispatch fetching is started
    dispatch(downloadsRangesRequested(packageId));
    // fetch data from npmService
    const data = await npmService.getDownloadsRanges(packageId, dateFrom, dateTo);
    // dispatch fetching action is complete
    dispatch(downloadsRangesReceived(packageId, data));
    return data;
  }
  return Promise.resolve();
};
