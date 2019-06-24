import React, { Component } from 'react';
import ShowListItem from '../ListItem/ShowListItem';

class ShowList extends Component {
	render(){
		let selectedShow = id => {
			let show = this.props.vanityItems.find(item => {
				return item.id === id;
			})
			return show === undefined ? 0 : show;
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

export default ShowList;