import { memo } from 'react';
// import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import './Layout.css';

const Layout = memo(({ children }) => {
	return (
		<div className="layout">
			<NavBar />
			<div className="layout__layout-box">
				{children}
				{/* <Footer links={[]} contacts={[]} /> */}
			</div>
		</div>
	);
});

export default Layout;
