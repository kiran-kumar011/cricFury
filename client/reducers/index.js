import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {currentUser, recentlyAddedTeam} from "./currentUser";
// import devToolsEnhancer from 'remote-redux-devtools';


const rootReducer = combineReducers({
  user: currentUser,
  teams: recentlyAddedTeam,
});
 



export default rootReducer;