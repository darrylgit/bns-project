import React, { Component } from 'react';
import ShowListItem from '../ListItem/ShowListItem';
import { withFirebase } from '../../config/index';

class ShowList extends Component {
	render(){
		
		let selectedShow = id => {
			let ref = `shows/${id}/metrics`;
			let showMetricsRef = this.props.firebase.doSnapshot(ref);
			let metrics = obj => {
				console.log(obj ===undefined);
				return obj === undefined ? {} : obj;
			}
			showMetricsRef.on('value', function(snapshot){
				metrics(snapshot.val());
			})

			return metrics();
		};
		let list = JSON.parse(this.props.dataSource);
		let listItems = list.map((elem, index) => 
			<span key = {index}>
				<div className="card">
					<span 
						className="card-overlay"
						onClick = {() => this.props.showDisplaySelected(elem.netflixid)}
					>
					</span>
					<ShowListItem
						image = {elem.image}
						socialViews = {selectedShow(elem.netflixid).views === undefined ? 0 : selectedShow(elem.netflixid).views}
						socialLikes = {selectedShow(elem.netflixid).likes === undefined ? 0 : selectedShow(elem.netflixid).likes}
						socialComments = {selectedShow(elem.netflixid).comments === undefined ? 0 : selectedShow(elem.netflixid).comments}
					/>
				</div>
			</span>
		);
		return(
			<figure>
				<figcaption>{listItems}</figcaption>
			</figure>
		);
	}
};

ShowList = withFirebase(ShowList)
export default ShowList;