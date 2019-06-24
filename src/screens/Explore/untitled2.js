import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from '../../config/index';
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
		let uid = this.props.firebase.currentUser().uid;
		let showRef = this.props.firebase.database.ref().child(
			`shows/${id}/metrics`);
		showRef.transaction(show => {
			let totals = show !== null && Object.values(show)[0].totals;
			let users = show !== null && Object.values(show)[0].users;
			let objKey = show !== null && Object.keys(show)[0];
			let updates ={};
			if(show){
				if(totals && users && users.likes[uid]){
					updates[`shows/${id}/metrics/${objKey}/totals/likes`] = totals.likes - 1;
					updates[`shows/${id}/metrics/${objKey}/users/likes/${uid}`] = null;
				}else{
					updates[`shows/${id}/metrics/${objKey}/totals/likes`] = totals.likes + 1;
					updates[`shows/${id}/metrics/${objKey}/users/likes/${uid}`] = true;
				}

				this.props.firebase.doFanOutUpdate(updates);
				return

			}else{
				let key = this.props.firebase.database.ref().child('shows').push().key;
				updates[`shows/${id}/metrics/${key}/totals/likes`] = 1;
				updates[`shows/${id}/metrics/${key}/users/likes/${uid}`] = true;

				this.props.firebase.doFanOutUpdate(updates);
				return
			}

		},function(error){
			if(error){
				console.log(error);
			}
		})
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
				firebase = {this.props.firebase}
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

ExploreScreen = withFirebase(ExploreScreen)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExploreScreen);