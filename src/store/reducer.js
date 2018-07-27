import Immutable from 'seamless-immutable';
import { DOWNLOADS_RECEIVED, DOWNLOADS_REQUESTED } from './actions';

/**
 * Initial data state
 */
const initialState = Immutable({
  isFetching: false,
  downloads: {},
  packages: [],
});

/**
 * Parse date format like: '2018-06-21'
 * @param data string
 * @returns {number} Unix time in ms
 */
const parseDate = (data) => {
  const arr = data.day.split('-');
  const year = parseInt(arr[0], 10);
  const month = parseInt(arr[1], 10) - 1;
  const day = parseInt(arr[2], 10);
  const date = new Date(year, month, day);
  return date.getTime();
};

const parseDownloads = data => data.map(item => (
  {date: parseDate(item), value: item.downloads}
));

const parseData = (data) => {
  if (!data) return {};
  const res = {};
  if (data.package) {
    res[data.package] = parseDownloads(data.downloads);
  } else {
    for (const p in data) {
      res[p] = data[p] ? parseDownloads(data[p].downloads) : [];
    }
  }
  return res;
};

export default function reduce(state = initialState, action = {}) {
  const {packages, data} = action;

  switch (action.type) {
    case DOWNLOADS_REQUESTED:
      return state.merge({
        isFetching: true,
        packages,
      });

    case DOWNLOADS_RECEIVED:
      return state.merge({
        isFetching: false,
        downloads: parseData(data),
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
// export function getDownloadsData(state) {
//   const {currentPackage, downloads} = state;
//   if (currentPackage && downloads[currentPackage]) {
//     const data = _.map(downloads[currentPackage], (value, key, collection) => ({date: parseInt(key, 10), value: collection[key]}));
//     return data;
//   }
//   return [];
// }