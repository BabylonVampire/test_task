import { memo, useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import { FaUserGroup, FaHouseChimney } from 'react-icons/fa6';
import './Layout.css';
import Header from './components/Header/Header';

const Layout = memo(({ children }) => {
	const links = [
		{
			link: '#home-page',
			icon: <FaHouseChimney />,
		},
		{
			link: '#users',
			icon: <FaUserGroup />,
		},
	];
	const [screenWidth, setScreenWidth] = useState(document.body.scrollWidth);
	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(document.body.scrollWidth);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className="layout">
			{screenWidth > 800 && <NavBar links={links} />}
			<div className="layout__layout-box">
				{screenWidth <= 800 && <Header links={links} />}
				{children}
				<Footer />
			</div>
		</div>
	);
});

export default Layout;
