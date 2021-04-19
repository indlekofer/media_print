# @indlekofer/media_print

## Usage

```js
import GET_PRINT, { REDUCER as MEDIA_REDUCER } from '@indlekofer/media_print';

const mapStateToProps = (state) => {
  return {
    mediaPrint: state[MEDIA_REDUCER].get(GET_PRINT) //mediaPrint -> false
  }
}

```

## Function exports

### init
detect print and run config with the that value

### setup
add eventlisteners and initialize media

### unset
remove all event listeners

### config
set specific value for print

## Constant exports

### REDUCER

### GET_PRINT (default)
