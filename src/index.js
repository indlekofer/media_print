import { handleChange, REDUCER } from '@indlekofer/media';

const GET_PRINT = '@indlekofer/media_print/GET_PRINT';

export const config = (print = false) => {
  handleChange(GET_PRINT, print);
};

const __configTrue = () => config(true);
const __mql = (mql) => config(mql.matches);

export const setup = () => {
  if (typeof window === 'object') {
    if (window.matchMedia) {
      window.matchMedia('print').addListener(__mql);
    } else {
      window.addEventListener('beforeprint', __configTrue);
      window.addEventListener('afterprint', config);
    }
  }
};

export const unset = () => {
  if (typeof window === 'object') {
    if (window.matchMedia) {
      window.matchMedia('print').removeListener(__mql);
    } else {
      window.removeEventListener('beforeprint', __configTrue);
      window.removeEventListener('afterprint', config);
    }
  }
};

setup();
config();

export {
  REDUCER,
  GET_PRINT
};
export default GET_PRINT;
