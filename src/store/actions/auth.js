import {
	ADD_FORM_INPUT_FIELD,
	CHANGE_FORM_INPUT_VALUE,
	SUBMIT_FORM_SUCCESS,
	UPDATE_AUTH,
	UPDATE_LOAD,
	DISPLAY_SIGNIN
} from './actionTypes';

export const addFormInputField = (key, value) =>{
	return{
		type:ADD_FORM_INPUT_FIELD,
		key:key,
		value:value
	}
};
export const changeFormInputValue = (key,value) => {
	return {
		type:CHANGE_FORM_INPUT_VALUE,
		key:key,
		value:value
	};
};
export const submitFormSuccess = () => {
	return {
		type:SUBMIT_FORM_SUCCESS
	};
};
export const updateLoad = bool => {
	return {
		type:UPDATE_LOAD,
		bool:bool
	};
};
export const updateAuth = bool => {
	return {
		type:UPDATE_AUTH,
		bool:bool
	};
};
export const displaySignin = () => {
	return {
		type:DISPLAY_SIGNIN
	};
};






