import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import storage from 'redux-persist/lib/storage';
import reducer from '../Reducers/Reducer';

// const persistConfig = {
//     key: 'root',
//     storage,
// }


const middlewares = applyMiddleware(thunkMiddleware);
const enhancers = [middlewares];
const composedEnhancers = composeWithDevTools(...enhancers);
const store = createStore(reducer, undefined, composedEnhancers);
export default store;
