import {combineReducers} from 'redux';
import UserReducer from './reducer-users';
import GitAuthReducer from './reducer-git-auth';
import ActiveUserReducer from './reducer-active-user';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    users: UserReducer,
    activeUser: ActiveUserReducer,
    git_auth: GitAuthReducer,
});

export default allReducers
