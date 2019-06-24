import React, { Component } from 'react';
import { IoMdEye, IoMdHeart, IoIosText, IoMdMore } from 'react-icons/io';

export default class SocialActionStack extends Component{
	render(){
		return(
			<div className="social-options-display">
				<button className='button'>
					<IoMdEye style={{fontSize:18, color:'rgba(170, 170, 170, .9)'}} />
					<p className='ml2' style={{fontFamily:'Work Sans', fontSize:13, color:'rgba(170, 170, 170, .8)'}}>{this.props.numViews}</p> 
				</button>
				<button className='button'>
					<IoMdHeart style={{fontSize:14, color:'rgba(170, 170, 170, .9)'}} />
					<p className='ml2' style={{fontFamily:'Work Sans', fontSize:13, color:'rgba(170, 170, 170, .8)'}}>{this.props.numLikes}</p> 
				</button>
				<button className='button'>
					<IoIosText style={{fontSize:15, color:'rgba(170, 170, 170, .9)'}} />
					<p className='ml2' style={{fontFamily:'Work Sans', fontSize:13, color:'rgba(170, 170, 170, .8)'}}>{this.props.numComments}</p> 
				</button>
				<div className ='icon-group-right'>
					<button className='button'>
						<IoMdMore style={{fontSize:13, color:'rgba(170, 170, 170, .9)'}} />
					</button>
				</div>
			</div>
		);
	}
}