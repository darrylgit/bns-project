import React, { Component } from 'react';
import AuthDefaultInput from '../Input/Input';

class AuthDefaultForm extends Component {
	render(){
		return(
			<form className="form-display">
				<span className="flex-column align-items-center pbxs">
					<h3>{this.props.formHeaderText}</h3>
				</span>
				<AuthDefaultInput
					name = "email"
					type ="email"
					placeholder = "email address"
					onChange = {event => this.props.onChange(event.target.name, event.target.value)}
				/>
				<AuthDefaultInput
					name ="password"
					type= "password"
					placeholder = "password"
					minlength="6"
					onChange={event => this.props.onChange(event.target.name, event.target.value)}
				/>
				<button 
					className="form-action-button" 
					type="submit" onClick={event => this.props.onFormSubmit(event)}>
					<span>{this.props.formButtonText}</span>
				</button>
			</form>
		);
	}
}

export class SigninDefaultForm extends Component {
	render(){
		return(
			<form className="form-display">
				<span className="flex-column align-items-center pbxs">
					<h3>Log In</h3>
				</span>
				<AuthDefaultInput
					name = "email"
					type ="email"
					placeholder = "email address"
					onChange = {event => this.props.onChange(event.target.name, event.target.value)}
				/>
				<AuthDefaultInput
					name ="password"
					type= "password"
					placeholder = "password"
					onChange={event => this.props.onChange(event.target.name, event.target.value)}
				/>
				<button 
					className="form-action-button" 
					type="submit" onClick={event => this.props.onSignin(event)}>
					<span>Sign In</span>
				</button>
			</form>
		);
	}
}
export class SignupDefaultForm extends Component {
	render(){
		return(
			<form className="form-display">
				<span className="flex-column align-items-center pbxs">
					<h3>Create Account</h3>
				</span>
				<AuthDefaultInput
					name = "username"
					type ="username"
					placeholder = "username"
					onChange = {event => this.props.onChange(event.target.name, event.target.value)}
				/>
				<AuthDefaultInput
					name = "email"
					type ="email"
					placeholder = "email address"
					onChange = {event => this.props.onChange(event.target.name, event.target.value)}
				/>
				<AuthDefaultInput
					name ="password"
					type= "password"
					placeholder = "password"
					minlength="6"
					onChange={event => this.props.onChange(event.target.name, event.target.value)}
				/>
				<button 
					className="form-action-button" 
					type="submit" onClick={event => this.props.onSignup(event)}>
					<span>Sign Up</span>
				</button>
			</form>
		);
	}
}

export default AuthDefaultForm;


