import React, { Component } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Nav = props => {
	return(
		<nav className="main hpx50 bg-dark">
			<a href='/' className="brand-light off-white">{props.brand}</a>
		</nav>
	);
};
class NavAuth extends Component {
	render(){
		return(
			<nav className="main hpx50 bg-dark">
				<a href='/' className="brand-light off-white">{this.props.brand}</a>
				{ this.props.userAuth &&
					<ul className="nav-items nav-items-end">
						<li className="li-target">
							<span className="flex-row align-items-center -light">{this.props.userDisplayName} <FiChevronDown/></span>
							<ul className="li-content">
								<li>Account</li>
								<li onClick ={this.props.onSignout}>Sign Out</li>
							</ul>
						</li>
					</ul>
				}
			</nav>
		);
	}
}
const NavSection = props => {
	return(
		<nav className="section hpx50 bg-white shadow-sm">
			<ul className ="nav-items nav-items-center">
				<li className="li-target">
					<span className="flex-row align-center">Sort <FiChevronDown/></span>
					<ul className="li-content">
						<li>Recent</li>
						<li>Popular</li>
					</ul>
				</li>
				<li className="li-target">
					<span className="flex-row align-center">Genre <FiChevronDown/></span>
					<ul className="li-content">
						<li>Drama</li>
						<li>Comedy</li>
					</ul>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
export { NavAuth, NavSection };

