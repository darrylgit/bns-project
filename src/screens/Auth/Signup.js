import React, { Component } from 'react';
import AuthDefaultForm from '../../components/UITemplates/Form/Form';

export default class SignUpScreen extends Component {
	render(){
		return(
			<div className = "flex-column align-items-center">
				<AuthDefaultForm
					formHeaderText = "Create Account"
					formButtonText = "Sign Up"
					onChange = {this.props.onChange}
					onFormSubmit = {event => this.props.onSignup(event)}
				/>
				<span className="form-footer-link"
				> Have an account? 
					<span 
						className="highlight form-footer-link-action" 
						onClick ={this.props.onDisplaySignin}
					> Sign In
					</span>
				</span>
			</div>
		);
	}
};
