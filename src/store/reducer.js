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
  if (value.day) {
    const arr = value.day.split('-'); //2018-06-21
    const year = parseInt(arr[0], 10);
    const month = parseInt(arr[1], 10) - 1;
    const day = parseInt(arr[2], 10);
    const date = new Date(year, month, day);
    res[date.getTime()] = value.downloads;
  }
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
      if (action.data) {
        const {downloads} = action.data;
        return state.merge({
          isFetching: false,
          downloads: {
            [packageId]: parseDownloads(downloads),
          },
        });
      } else {
        return state.merge({
          isFetching: false,
        });
      }

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
    const data = _.map(downloads[currentPackage], (value, key, collection) => ({date: parseInt(key, 10), value: collection[key]}));
    return data;
  }
  return [];
}