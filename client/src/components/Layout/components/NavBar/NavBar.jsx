import React from 'react';
import './NavBar.css';

/**
 * Компонент навигационного меню с пользовательскими ссылками.
 * @param {Array} links - массив объектов, содержащих ссылки и иконки для отображения.
 * @returns {JSX.Element} - компонент навигационного меню.
 */
const NavBar = ({ links }) => {
	return (
		<div className="nav-bar">
			<div className="nav-bar__box">
				{links.map((link) => {
					return (
						<a key={links.indexOf(link)} href={link.link}>
							<div className="nav-bar__link">{link.icon}</div>
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default NavBar;
