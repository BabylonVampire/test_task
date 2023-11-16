import React from 'react';
import HeroSection from './components/HeroSection/HeroSection';
import Layout from './components/Layout/Layout';
import Table from './components/Table/Table';

const App = () => {
	return (
		<div className="app">
			<Layout>
				<HeroSection />
				<Table
					config={{
						columns: [
							{
								key: 'name',
								label: 'Пользователи',
							},
							{
								key: 'email',
								label: 'E-Mail',
							},
							{
								key: 'phone',
								label: 'Телефон',
							},
							{
								key: 'dick',
								label: 'хуй',
							},
						],
					}}
					users={[
						{
							id: 1,
							name: 'Никита',
							phone: '+0000',
							email: 'text@email.cum',
							dick: 20,
						},
						{
							id: 2,
							name: 'Артем',
							phone: '+0000',
							email: 'text@email.cum',
							dick: 20,
						},
						{
							id: 3,
							name: 'Стец',
							phone: '+0000',
							email: 'text@email.cum',
							dick: -20,
						},
					]}
				/>
			</Layout>
		</div>
	);
};

export default App;
