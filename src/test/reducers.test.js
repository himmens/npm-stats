import Immutable from 'seamless-immutable';
import reduce from '../store/reducer';
import { downloadsRangesRequested, downloadsRangesReceived } from '../store/actions';

it('test downloads is requested', () => {
  const state = Immutable({
    isFetching: false,
    currentPackage: undefined,
  });

  expect(reduce(state, downloadsRangesRequested('postcss'))).toEqual({
    isFetching: true,
    currentPackage: 'postcss',
  });
});

it('test downloads is received', () => {
  const state = Immutable({
    isFetching: true,
    currentPackage: 'postcss',
  });

  expect(reduce(state, downloadsRangesReceived('postcss', {
    start: '2018-07-18',
    end: '2018-07-18',
    package: 'postcss',
    downloads: [{downloads: 100, day: '2018-07-18'}],
  }))).toEqual({
    isFetching: false,
    currentPackage: 'postcss',
    downloads: {
      postcss: {'2018-07-18': 100},
    },
  });
});