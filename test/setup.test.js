import assert from 'assert';
import store from '@indlekofer/redux-store';
import matchMedia, { reset, setData, getCall } from './matchMedia';
import { GET_PRINT, REDUCER, config, setup, unset } from '../src/index';

function handleChangeTest(done, print) {
  const state = store.getState()[REDUCER].get(GET_PRINT)
  assert.equal(print, state);
  done();
}

describe('setup', () => {
  let unsubscribe;

  beforeEach(() => {
    global.window = { matchMedia };
    store.dispatch({type: '@indlekofer/media/TYPE_CHANGE', payload: {key: GET_PRINT, value: null}});
  });

  afterEach(() => {
    unsubscribe();
    unset();
    reset();
  });

  it('initial without window', (done) => {
    global.window = undefined;
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, null));
    setup();
  });
  it('initial with empty window', (done) => {
    global.window = {};
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, null));
    setup();
  });
  it('init false', (done) => {
    setData('matches', false);
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, false));
    setup();
  });
  it('init true', (done) => {
    setData('matches', true);
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, true));
    setup();
  });
  it('basic setup', () => {
    setData('matches', false);
    setup();
    assert.equal(1, getCall('addEventListener').change);
    assert.equal(0, getCall('removeEventListener').change);
  });
  it('multiple setup calls should unset', () => {
    setData('matches', false);
    setup();
    setup();
    assert.equal(2, getCall('addEventListener').change);
    assert.equal(1, getCall('removeEventListener').change);
    assert.equal(0, getCall('addListener'));
    assert.equal(0, getCall('removeListener'));
  });
  it('basic setup addListener', () => {
    setData('matches', false);
    setData('addEventListener', undefined);
    setData('removeEventListener', undefined);
    setup();
    assert.equal(undefined, getCall('addEventListener'));
    assert.equal(undefined, getCall('removeEventListener'));
    assert.equal(1, getCall('addListener'));
    assert.equal(0, getCall('removeListener'));
  });
  it('basic setup no listeners', () => {
    setData('matches', false);
    setData('addEventListener', undefined);
    setData('removeEventListener', undefined);
    setData('addListener', undefined);
    setData('removeListener', undefined);
    setup();
    assert.equal(undefined, getCall('addEventListener'));
    assert.equal(undefined, getCall('removeEventListener'));
    assert.equal(undefined, getCall('addListener'));
    assert.equal(undefined, getCall('removeListener'));
  });
  it('window listeners', () => {
		let testAdd = 0, testRemove = 0;
		global.window = {
			addEventListener: () => { testAdd++ },
			removeEventListener: () => { testRemove++ }
		}
    setup();
		//each setup calls two times
    assert.equal(2, testAdd);
    assert.equal(0, testRemove);
    setup();
    assert.equal(4, testAdd);
    assert.equal(2, testRemove);
  });
});

