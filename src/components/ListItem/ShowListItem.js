import React, { Component } from 'react';
import SocialActionStack from '../UITemplates/Social/Social';

class ShowListItem extends Component {
	render(){
		return(
			<div>
				<img src={this.props.image} alt={this.props.synopsis}/>
				<SocialActionStack
					numViews = {this.props.socialViews}
					numLikes = {this.props.socialLikes}
					numComments = {this.props.socialComments}
				/>
			</div>
		);
	}
	
};

export default ShowListItem;