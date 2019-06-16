import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {currentUser} from "./currentUser";
// import devToolsEnhancer from 'remote-redux-devtools';


const rootReducer = combineReducers({
  user: currentUser,
});
 



export default rootReducer;