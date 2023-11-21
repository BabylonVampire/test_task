import { memo, useCallback, useEffect, useState } from 'react';
import { FaHouseChimney, FaUserGroup } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { modalSlice } from '../../store/reducers/ModalSlice';
import CreateUniversityForm from '../CreateUniversityForm/CreateUniversityForm';
import CreateUserForm from '../CreateUserForm/CreateUserForm';
import Modal from '../Modal/Modal';
import './Layout.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';

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
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const dispatch = useAppDispatch();
	const { changeModal } = modalSlice.actions;
	const { modal } = useAppSelector((state) => state.modalReducer);

	const setModalMode = useCallback(() => {
		switch (modal) {
			case 'createUser':
				return <CreateUserForm />;
			case 'createUniversity':
				return <CreateUniversityForm />;
			default:
				return;
		}
	}, [modal]);

	return (
		<div className="layout">
			{screenWidth > 800 && <NavBar links={links} />}
			{modal !== 'none' && (
				<Modal onClose={() => dispatch(changeModal('none'))}>
					{setModalMode()}
				</Modal>
			)}
			<div className="layout__layout-box">
				{screenWidth <= 800 && <Header links={links} />}
				{children}
				<Footer />
			</div>
		</div>
	);
});

export default Layout;
