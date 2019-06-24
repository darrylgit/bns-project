import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from '../../config/index';
import { 
	fetchShowsSuccess,
	setMetrics,
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
		.then(() => this.props.onFetchShowsSuccess())
		.catch((error) => {
			console.error(error);
		});
	};

	checkStorage = query => {
		return localStorage.getItem(query) === null ? 
		Promise.resolve(this.setMetrics())
		.then(() => this.fetchHandler())
		: 
		//initialize vanity items state with firebase shows metric data
		Promise.resolve(this.setMetrics())
		.then(() => this.props.onFetchShowsSuccess())
	};
	
	setMetrics = () => {
		let uid = this.props.firebase.currentUser().uid
		let showMetrics = []
		let userMetrics = {likes:[], views:[], comments:[]}
		//initialize vanity items state with firebase shows metric data
		return this.props.firebase.database.ref("shows").once('value')
		.then(snapshot => {
			snapshot.forEach(show => {
				showMetrics.push({id:show.key, likes:show.val().metrics.likes.count})
				if(show.val().metrics.likes.users !== undefined && 
					show.val().metrics.likes.users[uid] !== undefined && 
					show.val().metrics.likes.users[uid] === true){
					// set user likes
					userMetrics.likes.push(show.key)
				}
			})
			Promise.resolve(this.props.onSetMetrics("metrics", showMetrics))
			.then(() => this.props.onSetMetrics("userMetrics", userMetrics))
		})
	};

	likeAddedHandler = id => {
		let uid = this.props.firebase.currentUser().uid
		let showRef = this.props.firebase.database.ref(`shows/${id}`)
		
		let metrics = {likes:{count:{}, users:{}}}
		let userMetrics = this.props.userMetrics
		let updates = {}

		return showRef.once('value')
		.then(snapshot => {
			let show = snapshot.val()
			if(show !== null && show.metrics.likes.users !== undefined){
				//show ref and metrics object exists
				if(show.metrics.likes.users[uid] !== undefined){
					metrics["likes"]["count"] = show.metrics.likes.count - 1
					// add snapshot of users list to metrics object
					metrics["likes"]["users"] = show.metrics.likes.users 
					metrics["likes"]["users"][uid] = null
					// remove showId from user metrics likes
					userMetrics["likes"] = userMetrics["likes"].filter(showId => showId !== id)
				}else{
					metrics["likes"]["count"] = show.metrics.likes.count + 1
					// add snapshot of users list to metrics object
					metrics["likes"]["users"] = show.metrics.likes.users 
					metrics["likes"]["users"][uid] = true
					userMetrics["likes"].push(id)
				}	
			}else{
				metrics["likes"]["count"] = 1
				metrics["likes"]["users"][uid] = true
				userMetrics["likes"].push(id)
			}
			
			updates[`shows/${id}`] = {metrics:metrics}
			return this.props.firebase.doFanOutUpdate(updates)
			// our metrics object has up to data metrics so we can use it 
			// to avoid dependency on db here.
			.then(() => this.props.onSetMetrics("userMetrics", userMetrics))
			.then(() => this.props.onAddLike(id, metrics["likes"]["count"]))
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
					vanityItems = {this.props.metrics}
				/>
				<DetailModal
					dataSource = {this.props.detailData}
					userMetrics = {this.props.userMetrics}
					modalVisible = {this.props.detailModalVisible}
					buttonSelected = {this.likeAddedHandler}
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
		metrics: state.showsObj.metrics,
		userMetrics: state.showsObj.userMetrics,
		detailModalVisible:state.showsObj.detailModalVisible,
		detailData:state.showsObj.detailData
	}
};

const mapDispatchToProps = dispatch => {
	return{
		onFetchShowsSuccess: () => dispatch(fetchShowsSuccess()),
		onSetMetrics: (key, value) => dispatch(setMetrics(key, value)),
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


