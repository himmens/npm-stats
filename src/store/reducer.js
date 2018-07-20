import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { DOWNLOADS_RECEIVED, DOWNLOADS_REQUESTED } from './actions';

/**
 * Initial data state
 */
const initialState = Immutable({
  isFetching: false,
  downloads: {},
  currentPackage: undefined,
});

const parseDownloads = data => data.reduce((res, value) => {
  res[value.day] = value.downloads;
  return res;
}, {});

export default function reduce(state = initialState, action = {}) {
  const {packageId} = action;

  switch (action.type) {
    case DOWNLOADS_REQUESTED:
      return state.merge({
        isFetching: true,
        currentPackage: packageId,
      });

    case DOWNLOADS_RECEIVED:
      const {downloads} = action.data;
      return state.merge({
        isFetching: false,
        downloads: {
          [packageId]: parseDownloads(downloads),
        },
      });

    default:
      return state;
  }
}

// ================== Selectors =======================

/**
 * Select downloads data array from state object
 * @param state
 * @returns {Array}
 */
export function getDownloadsData(state) {
  const {currentPackage, downloads} = state;
  if (currentPackage && downloads[currentPackage]) {
    const data = _.map(downloads[currentPackage], (value, key, collection) => ({date: key, downloads: collection[key]}));
    return data;
  }
  return [];
}