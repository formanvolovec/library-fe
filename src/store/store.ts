import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './root.reducer'
import rootSaga from "./root.saga";
import {composeWithDevTools} from "redux-devtools-extension/logOnlyInProduction";
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store

// разобраться с redux saga выебывается стор

