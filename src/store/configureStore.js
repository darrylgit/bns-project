import {createStore, combineReducers, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import showsReducer, { authReducer } from './reducers/index';

const rootReducer = combineReducers({
	showsObj:showsReducer,
	authObj:authReducer
});

const configureStore = () => {
	return createStore(rootReducer, {}, applyMiddleware(reduxThunk));
};
export default configureStore;