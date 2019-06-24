import React, { Component } from 'react';
import { ModalHeader } from '../UITemplates/Header/Header';

class ModalView extends Component {
	render(){
		const { dataSource } = this.props;
		return(
			<div className="container-fluid no-gutters">
				<ModalHeader
					userMetrics = {this.props.userMetrics}
					dataSource = {dataSource}
					buttonSelected = {this.props.buttonSelected}
					closeButtonSize = {this.props.closeButtonSize}
					closeButtonSelected = {this.props.closeButtonSelected}
				/>
				<section className="container pylg">
					<div className="row justify-content-center">
						<div className="col-12 col-sm-5 flex-column align-items-center pxxs">
							<img src={dataSource.image} alt={dataSource.synopsis} width='100%' height='90%'/>
						</div>
						<div className="col-12 col-sm-7 pxsm">
							<article>
								<p className="desc-lg">{dataSource.synopsis}</p>
							</article>
						</div>
					</div>
				</section>
			</div>
		);
	}
};

export default ModalView;