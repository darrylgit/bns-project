import { 
	SET_METRICS,
	FETCH_SHOWS_SUCCESS,
	ADD_SHOW,
	ADD_LIKE,
	SELECT_SHOW,
	DESELECT_SHOW
} from './actionTypes';

export const setMetrics = (key, value) => {
	return {
		type:SET_METRICS,
		key:key,
		value:value
	}
}

export const fetchShowsSuccess = () => {
	return{
		type:FETCH_SHOWS_SUCCESS,
	};
};
export const addShow = id => {
	return {
		type:ADD_SHOW,
		id:id
	};
};
export const addLike = (id, count) => {
	return{
		type:ADD_LIKE,
		id:id,
		count:count
	};
};

export const selectShow = obj => {
	return {
		type:SELECT_SHOW,
		obj:obj
	};
};

export const deselectShow = () => {
	return {
		type:DESELECT_SHOW
	};
};