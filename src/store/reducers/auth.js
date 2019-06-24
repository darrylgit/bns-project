import {
	ADD_FORM_INPUT_FIELD,
	CHANGE_FORM_INPUT_VALUE,
	SUBMIT_FORM_SUCCESS,
	UPDATE_LOAD,
	UPDATE_AUTH,
	DISPLAY_SIGNIN
} from '../actions/actionTypes';

const initialState = {
	userInputs:[],
	isLoaded:false,
	isAuthenticated:false,
	displaySignin:true
};

const authReducer = (state = initialState, action) => {
	switch(action.type){
		case ADD_FORM_INPUT_FIELD:
			return {
				...state,
				userInputs:state.userInputs.concat({
					key:action.key,
					value:action.value
				})
			};
		case CHANGE_FORM_INPUT_VALUE:
			return {
				...state,
				userInputs:state.userInputs.filter(item => {
					return item.key !== action.key;
				}).concat({
					key:action.key,
					value:action.value
				})
			};
		case SUBMIT_FORM_SUCCESS:
			return {
				...initialState
			};
		case UPDATE_LOAD:
			return {
				...state,
				isLoaded:action.bool
			};
		case UPDATE_AUTH:
			return {
				...state,
				isAuthenticated:action.bool
			};
		case DISPLAY_SIGNIN:
			return {
				...state,
				displaySignin:!state.displaySignin
			};
		default:
			return state;
	}
};

export default authReducer;