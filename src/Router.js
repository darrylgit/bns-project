import React, { Component } from 'react';
import { 
	withRouter,
	Switch,
	Route,
	Redirect,
	BrowserRouter as Router
} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { NavAuth } from './components/UITemplates/Nav/Nav';
import Footer from './components/UITemplates/Footer/Footer';
import AuthScreen from './screens/Auth/Auth';
import HomeScreen from './screens/Home/Home';

import { connect } from 'react-redux';
import {
	updateLoad,
	updateAuth
} from './store/actions/index';
import { withFirebase } from './config/index';

class PrivateRoute extends Component {
	componentDidMount(){
		this.authenticate()
	}
	authenticate(){
		this.props.firebase.auth.onAuthStateChanged(
			authUser => {
				return new Promise(function(resolve, reject){
					authUser ? resolve(authUser) : 
					reject(new Error('No User Signed in'))
				})
				.then(() => this.props.onUpdateAuth(true))
				.then(() => this.props.onUpdateLoad(true))
				.catch(error => {
					console.log(error);
					this.props.history.push(ROUTES.AUTH);
				})
			}
		)
	}
	render(){
		const { 
			isLoaded,
			isAuthenticated,
			component: Component, 
			...rest
		} = this.props;
		if (!isLoaded) return null
		return(
			<Route 
				{ ...rest }
				render = { props => {
					return isAuthenticated ? (
						<Component {...props} />
					) : (
						<Redirect
							to = { ROUTES.AUTH }
						/>
					)
				}}
			/>
		);
	}
}

class Routes extends Component {
	signoutHandler = () => {
		Promise.resolve(this.props.onUpdateAuth(false))
		.then(() => this.props.firebase.doSignOut())
	};
	render(){
		return(
			<div>
				<NavAuth
					brand ="BNS"
					userAuth = {this.props.isAuthenticated}
					userDisplayName={this.props.isAuthenticated && 
						this.props.firebase.currentUser().email}
					onSignout = {this.signoutHandler}
				/>
				<Router>
					<Switch>
						<Route 
							path = { ROUTES.AUTH } 
							component = { AuthScreen } 
						/>
						<PrivateRoute
							{...this.props}
							path = { ROUTES.HOME } 
							component = { HomeScreen } 
						/>
					</Switch>
				</Router>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoaded:state.authObj.isLoaded,
		isAuthenticated:state.authObj.isAuthenticated
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onUpdateLoad: bool => dispatch(updateLoad(bool)),
		onUpdateAuth: bool => dispatch(updateAuth(bool))
	};
};

PrivateRoute = withRouter(PrivateRoute)
Routes = withFirebase(Routes)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Routes);



