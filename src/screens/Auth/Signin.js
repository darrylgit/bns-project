import React, { Component } from 'react';
import { SigninDefaultForm } from '../../components/UITemplates/Form/Form';

export default class SigninScreen extends Component {
	render(){
		return(
			<div className = "flex-column align-items-center">
				<SigninDefaultForm
					onChange = {this.props.onChange}
					onSignin = {event => this.props.onSignin(event)}
				/>
				<span className="form-footer-link"
				> New to BNS? 
					<span 
						className="highlight form-footer-link-action" 
						onClick ={this.props.onDisplaySignin}
					> Create an account
					</span>
				</span>
			</div>
		);
	}
}