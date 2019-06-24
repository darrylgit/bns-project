import React from 'react';

import { IoLogoTwitter, IoLogoFacebook, IoLogoGithub } from 'react-icons/io';

const Footer = props => {
	return(
		<footer>
			<div 
				className="
				flex-column 
				justify-content-center 
				col-12 
				col-md-6 
				col-md-align-items-center-start"
			>
				<span className="copyright">@ 2019 Darryl Smith II</span>
			</div>
			<div 
				className="
				flex-column 
				justify-content-center 
				col-12 
				col-md-6 
				col-md-align-items-center-end"
			>
				<ul className="social">
					<a href="https://twitter.com/_darrylmichael" target="_blank" rel="noopener noreferrer">
						<IoLogoTwitter size={16} />
					</a>
					<a href="https://www.facebook.com/darrylmsmithii" target="_blank" rel="noopener noreferrer">
						<IoLogoFacebook size={16} />
					</a>
					<a href="https://github.com/dmsii" target="_blank" rel="noopener noreferrer">
						<IoLogoGithub size={16} />
					</a>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;