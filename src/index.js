import { handleChange, REDUCER } from '@indlekofer/media';

export const GET_PRINT = '@indlekofer/media_print/GET_PRINT';

let __isInitialSetup = true;

export const config = (print = false) => {
  handleChange(GET_PRINT, print);
};

const _handleChange = (e) => {
  if (typeof e == 'undefined' || typeof e.matches == 'undefined') {
    config(null);
  } else if (e.matches) {
    config(true);
  } else {
    config(false);
  }
};

export const init = () => {
  if (typeof window == 'object' && window.matchMedia) {
    const mediaQuery = window.matchMedia('print');
    _handleChange(mediaQuery);
  } else {
    config(null);
  }
};

export const setup = () => {
  if (!__isInitialSetup) unset();
  if (typeof window == 'object') {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('print');
      if (typeof mediaQuery.addEventListener == 'function') {
        mediaQuery.addEventListener('change', _handleChange);
      } else if (typeof mediaQuery.addListener == 'function') {
        mediaQuery.addListener(_handleChange);
      }
      _handleChange(mediaQuery);
    } else if (typeof window.addEventListener == 'function') {
      window.addEventListener('beforeprint', config.bind(null, true));
      window.addEventListener('afterprint', config.bind(null, false));
      config(null);
    } else {
      config(null);
    }
  } else {
    config(null);
  }
  __isInitialSetup = false;
};

export const unset = () => {
  if (typeof window === 'object') {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('print');
      if (typeof mediaQuery.removeEventListener == 'function') {
        mediaQuery.removeEventListener('change', _handleChange);
      } else if (typeof mediaQuery.removeListener == 'function') {
        mediaQuery.removeListener(_handleChange);
      }
    } else if (typeof window.addEventListener == 'function') {
      window.removeEventListener('beforeprint', config);
      window.removeEventListener('afterprint', config);
    }
  }
  __isInitialSetup = true;
};

setup();

export {
  REDUCER
};
export default GET_PRINT;
