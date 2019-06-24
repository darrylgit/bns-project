import React, { Component } from 'react';

class AuthDefaultInput extends Component {
	render(){
		return(
			<div>
				{
					this.props.label ? 
					<label> {this.props.label}
						<input 
							className="form-input"
							{...this.props}
							required 
						/>
					</label> :
					<input 
						className="form-input"
						{...this.props}
						required 
					/>
				}
			</div>
		);
	}
};

export default AuthDefaultInput;