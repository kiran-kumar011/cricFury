import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { currentUser, recentlyAddedTeam, addingMatchData } from "./currentUser";
// import devToolsEnhancer from 'remote-redux-devtools';


const rootReducer = combineReducers({
  user: currentUser,
  teams: recentlyAddedTeam,
  match: addingMatchData,
});
 



export default rootReducer;