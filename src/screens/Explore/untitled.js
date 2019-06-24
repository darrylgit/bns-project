import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	fetchShowsSuccess,
	addShow,
	addLike,
	selectShow,
	deselectShow
} from  '../../store/actions/index';

import { 
	API_CONSTANT_MAP,
	API_CONSTANT_HEADERS
} from '../../constants/api';

import { NavSection } from '../../components/UITemplates/Nav/Nav';
import ShowList from '../../components/List/ShowList';
import DetailModal from '../../components/UITemplates/Modal/Modal';

class ExploreScreen extends Component {
	componentDidMount(){
		//localStorage.removeItem(API_CONSTANT_MAP.series)
		this.checkStorage(API_CONSTANT_MAP.series)
	};

	fetchHandler = () => {
		return fetch(API_CONSTANT_MAP.series,{
			headers:API_CONSTANT_HEADERS.headers
		})
		.then((response) => response.json())
		.then((responseJson) => localStorage.setItem(
			API_CONSTANT_MAP.series,
			JSON.stringify(responseJson.ITEMS)
		))
		//initialize vanity items state with firebase shows metric data
		.then(() => this.props.onFetchShowsSuccess())
		.catch((error) => {
			console.error(error);
		});
	};

	checkStorage = query => {
		return localStorage.getItem(query) === null ? 
		this.fetchHandler() : 
		//initialize vanity items state with firebase shows metric data
		this.props.onFetchShowsSuccess()
	};

	likeAddedHandler = id => {
		let selectedShow = this.props.vanityItems.find(item => {
			return item.id === id;
		})

		selectedShow === undefined ? 
			this.props.onAddShow(id) : 
			this.props.onAddLike(id, selectedShow.likes)
	};
	showSelectedHandler = id => {
		let dataSource = JSON.parse(localStorage.getItem(
			API_CONSTANT_MAP.series))
		let data = dataSource.find(item => {
			return item.netflixid === id;
		})
		this.props.onSelectShow(data);
	};

	render() {
		if(this.props.isLoading){
			return(
				<div className="loading-page">
					<h1>Loading...</h1>
				</div>
			)
		}
		return (
			<div className="
			flex-column
			align-items-center
			mt50
			"
			>
				<NavSection />
				<ShowList 
					dataSource = {localStorage.getItem(API_CONSTANT_MAP.series)}
					showDisplaySelected = {this.showSelectedHandler}
					vanityItems = {this.props.vanityItems}
				/>
				<DetailModal
					dataSource = {this.props.detailData}
					modalVisible = {this.props.detailModalVisible}
					onLikeItemSelected = {this.likeAddedHandler}
					closeButtonSize = {50}
					closeButtonSelected = {this.props.onDeselectShow}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return{
		isLoading: state.showsObj.isLoading,
		vanityItems: state.showsObj.vanityItems,
		detailModalVisible:state.showsObj.detailModalVisible,
		detailData:state.showsObj.detailData
	}
};

const mapDispatchToProps = dispatch => {
	return{
		onFetchShowsSuccess: () => dispatch(fetchShowsSuccess()),
		onAddShow: id => dispatch(addShow(id)),
		onAddLike: (id, likeCount) => dispatch(addLike(id, likeCount)),
		onSelectShow: obj => dispatch(selectShow(obj)),
		onDeselectShow: () => dispatch(deselectShow())
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExploreScreen);