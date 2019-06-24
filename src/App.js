import React, { Component } from 'react';
import Routes from './Router';
import './App.css';

class App extends Component {
	signoutHandler = () => {
		this.props.firebase.doSignOut();
	};
	render() { 
		return (
			<Routes/>
		); 
	}
}
export default App;
