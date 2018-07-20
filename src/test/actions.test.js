import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DOWNLOADS_RECEIVED, DOWNLOADS_REQUESTED, getDownloadsRanges } from '../store/actions';

global.fetch = require('jest-fetch-mock');

const mockStore = configureStore([thunk]);

it('test getDownloadsRanges', async () => {
  const store = mockStore({});

  // emulate fake npm service response
  const data = {
    start: '2018-07-18',
    end: '2018-07-18',
    package: 'postcss',
    downloads: [{downloads: 0, day: '2018-07-18'}],
  };
  fetch.mockResponseOnce(JSON.stringify(data));

  await store.dispatch(getDownloadsRanges('postcss'));
  const actions = store.getActions();

  expect(actions[0]).toEqual({type: DOWNLOADS_REQUESTED, packageId: 'postcss'});
  expect(actions[1].type).toEqual(DOWNLOADS_RECEIVED);
  expect(actions[1].data).toEqual(data);
});