import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from '../../config/index';
import SigninScreen from './Signin';
import SignupScreen from './Signup';
import { 
	displaySignin,
	addFormInputField,
	changeFormInputValue,
	submitFormSuccess
} from '../../store/actions/index';
import * as ROUTES from '../../constants/routes';

class AuthScreen extends Component {
	displaySigninHandler = () => {
		this.props.onDisplaySignin()
	};
	onChangeHandler = (key, value) => {
		let formField = this.props.userInputs.find(item => { 
			return item.key === key;
		})

		formField === undefined ? 
			this.props.onAddFormInputField(key, value) :
			this.props.onChangeFormInputValue(key, value)
	};
	signinHandler = event => {
		let form = Array.from(document.querySelectorAll("form")).find(elem => {
			return elem.contains(event.target)
		})
		let email = this.props.userInputs.find(item => {
			return item.key === 'email';
		})
		let password = this.props.userInputs.find(item => {
			return item.key === 'password';
		})

		if (email !== undefined && password !== undefined){
			if (email.value !== '' && password.value !== ''){
				if (form.checkValidity()){
					event.preventDefault()
					this.props.firebase.doSignInWithEmailAndPassword(
						email.value, password.value)
					.then(() => this.props.onSubmitFormSuccess())
					.then(() => this.props.history.push(ROUTES.HOME))
					.catch((error) => console.log(error))
				}
			}
		}
	};
	signupHandler = event => {
		let form = Array.from(document.querySelectorAll("form")).find(elem => {
			return elem.contains(event.target)
		})
		let email = this.props.userInputs.find(item => {
			return item.key === 'email';
		})
		let password = this.props.userInputs.find(item => {
			return item.key === 'password';
		})
		
		if (email !== undefined && password !== undefined){
			if (email.value !== '' && password.value !== ''){
				if (form.checkValidity()){
					event.preventDefault()
					this.props.firebase.doCreateUserWithEmailAndPassword(
						email.value, password.value)
					.then(() => this.props.onSubmitFormSuccess())
					.then(() => this.props.history.push(ROUTES.HOME))
					.catch((error) => console.log(error))
				}
			}
		}
	};
	render(){
		const { displaySignin } = this.props;
		return(
			<div className="single-page-orientaion-center">
				{
					displaySignin ?
					<SigninScreen 
						onDisplaySignin = {this.displaySigninHandler}
						onChange = {this.onChangeHandler}
						onSignin = {this.signinHandler}
					/> :
					<SignupScreen 
						onDisplaySignin = {this.displaySigninHandler} 
						onChange = {this.onChangeHandler}
						onSignup = {this.signupHandler}
					/>
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInputs:state.authObj.userInputs,
		displaySignin: state.authObj.displaySignin
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onDisplaySignin: () => dispatch(displaySignin()),
		onAddFormInputField: (key, value) => dispatch(addFormInputField(key,value)),
		onChangeFormInputValue: (key, value) => dispatch(changeFormInputValue(key,value)),
		onSubmitFormSuccess: () => dispatch(submitFormSuccess())
	}
}

AuthScreen = withFirebase(AuthScreen)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthScreen);