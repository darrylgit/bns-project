import React, { Component } from 'react';
import Modal from 'react-modal';
import ModalView from '../../View/View';
import './react-modal.css';

Modal.setAppElement('#root');
class DetailModal extends Component {
	render(){
		return(
			<Modal
				overlayClassName = "React__Modal__Overlay"
				className = "React__Modal__Content"
				isOpen = {this.props.modalVisible}
			>
				<ModalView 
					userMetrics = {this.props.userMetrics}
					dataSource = {this.props.dataSource}
					buttonSelected = {this.props.buttonSelected}
					closeButtonSize = {this.props.closeButtonSize}
					closeButtonSelected = {this.props.closeButtonSelected}
				/>
			</Modal>
		);
	}
};

export default DetailModal;
