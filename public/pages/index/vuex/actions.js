import * as types from './mutation-types'

export const incrementAsync = ({dispatch}) => {
  setTimeout(() => {
    dispatch(types.INCREMENT)
  }, 1000)
}

export const decrementAsync = ({dispatch}) => {
  setTimeout(() => {
    dispatch(types.DECREMENT)
  }, 1000)
}
