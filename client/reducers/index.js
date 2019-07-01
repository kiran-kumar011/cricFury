import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { currentUser, recentlyAddedTeam, addingMatchData, addingBatsmen, addingBowlers } from "./currentUser";
// import devToolsEnhancer from 'remote-redux-devtools';


const rootReducer = combineReducers({
  user: currentUser,
  teams: recentlyAddedTeam,
  match: addingMatchData,
  batsmens: addingBatsmen,
  bowlers: addingBowlers,
});
 



export default rootReducer;



