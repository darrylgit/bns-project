import React, { Component } from 'react';
import CloseButton, { LikeButtonStack } from '../Button/Button';

const Header = props => {
	return(
		<header className='hv80'>
		</header>
	);
};

class ModalHeader extends Component{
	render(){
		const { dataSource } = this.props;
		return(
			<header className = "flex-column justify-content-center hpx150 pxsm bg-off-white">
				<span className="close-button-display">
					<CloseButton 
						size={this.props.closeButtonSize}
							closeButtonSelected = {this.props.closeButtonSelected}
						/>
				</span>
				<h3>{dataSource.title}</h3>
				<h3 className = "sub-heading">in {dataSource.type}</h3>
				<LikeButtonStack
					buttonKey={dataSource.netflixid}
					buttonSelected = {this.props.buttonSelected}
					buttonIds = {this.props.userMetrics["likes"]}
				/>
			</header>
		);
	}
	
};

export default Header; 
export { ModalHeader };