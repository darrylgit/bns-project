import React, { Component } from 'react';
import ShowListItem from '../ListItem/ShowListItem';

class ShowList extends Component {
	render(){
		let selectedShow = id => {
			let vanity = this.props.vanityItems.find(item => {
				return item.id === id
			})
			return vanity
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
						socialViews = {selectedShow(elem.netflixid) !== undefined && selectedShow(elem.netflixid).views !== undefined ? selectedShow(elem.netflixid).views: 0}
						socialLikes = {selectedShow(elem.netflixid) !== undefined && selectedShow(elem.netflixid).likes !== undefined ? selectedShow(elem.netflixid).likes: 0}
						socialComments = {selectedShow(elem.netflixid) !== undefined && selectedShow(elem.netflixid).comments !== undefined ? selectedShow(elem.netflixid).comments: 0}
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

export default ShowList;