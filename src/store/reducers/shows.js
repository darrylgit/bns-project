import { 
	FETCH_SHOWS_SUCCESS,
	SET_METRICS,
	ADD_SHOW,
	ADD_LIKE,
	SELECT_SHOW,
	DESELECT_SHOW
} from '../actions/actionTypes';

const initialState = {
	//initialize state
	isLoading:true,
	metrics:[],
	userMetrics:{},
	detailModalVisible:false
};

const showsReducer = (state = initialState, action) => {
	switch (action.type){
		case FETCH_SHOWS_SUCCESS:
			return {
				...state,
				isLoading:false
			};
		case SET_METRICS:
			return Object.assign({}, state, {[action.key]:action.value});
		case ADD_SHOW:
			return {
				...state,
				metrics:state.metrics.concat({
					id:action.id,
					likes:1
				})
			};
		case ADD_LIKE:
			return {
				...state,
				metrics:state.metrics.filter(item => {
					return item.id !== action.id;
				}).concat({
					id:action.id,
					likes:action.count
				})
			};
		case SELECT_SHOW:
			return {
				...state,
				detailModalVisible:true,
				detailData:action.obj
			};
		case DESELECT_SHOW:
			return {
				...state,
				detailModalVisible:false,
				detailData:''
			}
		default:
			return state;
	}
	
};

export default showsReducer;