import { memo } from 'react';
import './Footer.css';

const Footer = memo(() => {
	const date = new Date().getFullYear();
	return (
		<footer className="footer">
			<div className="footer__container"></div>
			<p className="footer__copyright">
				© {date} Сделано BabylonVampire в качестве тестового задания
			</p>
		</footer>
	);
});

export default Footer;
