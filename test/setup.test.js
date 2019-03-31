import assert from 'assert';
import store from '@indlekofer/redux-store';
import { GET_PRINT, REDUCER, config, setup, unset } from '../src/index';

function getNewWindow() {
  return function () {
    this.testAdd = 0;
    this.testRemove = 0;
    this.testPrintTrue = 0;
    this.testPrintFalse = 0;
    this.addEventListener = function (name, func) {this.testAdd++};
    this.removeEventListener = function (name, func) {this.testRemove++};
  };
}
function getNewMatchMediaWindow(shoudl) {
  var matchMedia = new (function () {
    this.testAdd = 0;
    this.testRemove = 0;
    this.addListener = function () { this.testAdd++ };
    this.removeListener = function () { this.testRemove++ };
  });

  return function () {
    this.testAdd = 0;
    this.testRemove = 0;
    this.addEventListener = function () { this.testAdd++ };
    this.removeEventListener = function () { this.testRemove++ };
    this.matchMedia = function () { return matchMedia };
  };
}
describe('setup', () => {
  beforeEach(() => {
    global.window = new (getNewWindow());
  });
  it('check setup without match media', () => {
    setup();
    assert.equal(window.testAdd, 2);
    assert.equal(window.testRemove, 0);
  });
  it('check unset without match media', () => {
    unset();
    assert.equal(window.testAdd, 0);
    assert.equal(window.testRemove, 2);
  });
  it('check setup with match media', () => {
    global.window = new (getNewMatchMediaWindow());
    setup();
    assert.equal(window.testAdd, 0);
    assert.equal(window.testRemove, 0);
    assert.equal(window.matchMedia().testAdd, 1);
    assert.equal(window.matchMedia().testRemove, 0);
  });
  it('check unset with match media', () => {
    global.window = new (getNewMatchMediaWindow());
    unset();
    assert.equal(window.testAdd, 0);
    assert.equal(window.testRemove, 0);
    assert.equal(window.matchMedia().testAdd, 0);
    assert.equal(window.matchMedia().testRemove, 1);
  });
  it('check unset with undefinedwindow', () => {
    global.window = undefined;
    unset();
    assert.equal(typeof window === 'undefined', true);
  });
});

