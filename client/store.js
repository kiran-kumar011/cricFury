import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from "redux-thunk";

// const logger = function(store){ 
// 	return function(next){
// 		return function(action){
// 			console.group(action.type);
// 			console.log(`%c ${action}`, 'background: #222; color: #bada55');
// 			console.groupEnd();
// 			return next(action);
// 		}
// 	}
// }

// const thunk = function({dispatch, getState}){
// 	return function(next){
// 		return function(action){
// 			if(typeof action === "function"){
// 				return action(dispatch, getState)
// 			}
// 			return next(action);
// 		}
// 	}
// }

// const typeCheck = function({dispatch, getState}){
// 	return function(next){
// 		return function(action){
// 			if(action.type.includes('ADD')){
// 				console.log("🥵 Bug Found")
// 			}
// 			return next(action);
// 		}
// 	}
// }

// const middleware = [logger, thunk];


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store = createStore(rootReducer, enhancer);

export default store;



