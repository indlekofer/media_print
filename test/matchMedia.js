let __data = {};
let __calls = {};

export default (query) => {

  let ret = {
    matches: __data.matches
  };

  if (typeof __data.addEventListener != 'undefined') {
    if (typeof __calls.addEventListener == 'undefined') __calls.addEventListener = { change: 0 };
    ret.addEventListener = (listener) => {
      if (typeof __calls.addEventListener[listener] == 'undefined') {
        __calls.addEventListener[listener] = 1;
      } else {
        __calls.addEventListener[listener]++;
      }
    };
  }

  if (typeof __data.removeEventListener != 'undefined') {
    if (typeof __calls.removeEventListener == 'undefined') __calls.removeEventListener = { change: 0 };
    ret.removeEventListener = (listener) => {
      if (typeof __calls.removeEventListener[listener] == 'undefined') {
        __calls.removeEventListener[listener] = 1;
      } else {
        __calls.removeEventListener[listener]++;
      }
    };
  }

  if (typeof __data.addListener != 'undefined') {
    if (typeof __calls.addListener == 'undefined') __calls.addListener = 0;
    ret.addListener = (listener) => {
      __calls.addListener++;
    };
  }

  if (typeof __data.removeListener != 'undefined') {
    if (typeof __calls.removeListener == 'undefined') __calls.removeListener = 0;
    ret.removeListener = (listener) => {
      __calls.removeListener++;
    };
  }

  return ret;
};

export const reset = () => {
  __calls = {};
  __data = {
    matches: null,
    addEventListener: null,
    removeEventListener: null,
    addListener: null,
    removeListener: null
  }
};

export const setData = (name, value) => {
  __data[name] = value;
};

export const getCall = (name) => {
  return __calls[name];
}

reset();
