// COMBINE
import { combineReducers } from 'redux';

// MY REDUCERS
import routes from './routes';
import dashboard from './dashboard';
import utility from './utility';
import authentication from './authentication';
import rides from './rides';
import locations from './locations';
import profile from './profile';
import errors from './errors';

// REDUX FORM
import {reducer as form} from 'redux-form';

// CREATE ROOT REDUCER
const rootReducer = combineReducers({
    utility,
    authentication,
    dashboard,
    locations,
    routes,
    rides,
    errors,
    profile,
    form
});

export default rootReducer;
