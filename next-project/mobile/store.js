import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { reducer as globalReducer } from './common/store/reducer';

export function initializeStore () {
  return createStore(globalReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
