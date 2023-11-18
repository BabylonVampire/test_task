import React from 'react';
import { FaUserGroup, FaHouseChimney } from 'react-icons/fa6';
import './NavBar.css';

const NavBar = () => {
	return (
		<div className="nav-bar">
			<div className="nav-bar__box">
				<a href="#home-page">
					<div className="nav-bar__link">
						<FaHouseChimney />
					</div>
				</a>
				<a href="#users">
					<div className="nav-bar__link">
						<FaUserGroup />
					</div>
				</a>
			</div>
		</div>
	);
};

export default NavBar;
