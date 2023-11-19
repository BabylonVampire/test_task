import React from 'react';
import './Header.css';

/**
 * Компонент хэдера с пользовательскими ссылками.
 * @param {Array} links - массив объектов, содержащих ссылки и иконки для отображения.
 * @returns {JSX.Element} - компонент хэдера.
 */
const Header = ({ links }) => {
	return (
		<header className="header">
			<div className="header__box">
				{links.map((link) => {
					return (
						<a key={links.indexOf(link)} href={link.link}>
							<div className="header__link">{link.icon}</div>
						</a>
					);
				})}
			</div>
		</header>
	);
};

export default Header;
