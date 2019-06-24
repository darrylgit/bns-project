import React, { Component } from 'react';
import { IoIosClose, IoMdHeart } from 'react-icons/io';

class CloseButton extends Component {
	render(){
		return(
			<button 
				className = "button" 
				onClick = {this.props.closeButtonSelected}
			>
				<IoIosClose size={this.props.size}/>
			</button>
		);
	}
};

export class LikeButtonStack extends Component {
	render(){
		let buttonSelectedStyle = id => {
			let show = this.props.buttonIds.find(buttonId => {
				return buttonId === id
			})

			return show !== undefined ? "rgba(0, 150, 204, .25)" : "white"
		}
		return(
			<button 
				className="button-social-stack-md"
				style={{backgroundColor:buttonSelectedStyle(this.props.buttonKey)}}
				onClick = {() => this.props.buttonSelected(this.props.buttonKey)}
			>
				<span><IoMdHeart/></span>
				<span><pre>Like</pre></span>
			</button>
		);
	}
}

export default CloseButton;