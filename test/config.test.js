import assert from 'assert';
import store from '@indlekofer/redux-store';
import { GET_PRINT, REDUCER, config } from '../src/index';

function handleChangeTest(done, print) {
  const state = store.getState()[REDUCER].get(GET_PRINT)
  assert.equal(print, state);
  done();
}
describe('config', () => {
  var unsubscribe;

  afterEach(() => {
    unsubscribe();
  });
  
  it('check config', (done) => {
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, false));
    config();
  });
  it('check config true', (done) => {
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, true));
    config(true);
  });
  it('check config false', (done) => {
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, false));
    config(false);
  });
});

