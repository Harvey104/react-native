import { createStore, combineReducers} from 'redux';
import AuthReducer from './reducers/authReducer';
import profileReducer from './reducers/profileReducer';
import quizReducer from './reducers/quizReducer';
import competitionReducer from './reducers/competitionReducer';
import competitorReducer from './reducers/competitorReducer';
import challengerReducer from './reducers/challengerReducer';
import challengeIdReducer from './reducers/challengeIdReducer';
 
const rootReducer = combineReducers({
  auth: AuthReducer,
  profile: profileReducer,
  quiz: quizReducer,
  competition: competitionReducer,
  competitor: competitorReducer,
  challenger: challengerReducer,
  challengeId: challengeIdReducer
});
 
export const store = createStore(rootReducer);
