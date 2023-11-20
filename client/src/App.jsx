import React, { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection/HeroSection';
import Layout from './components/Layout/Layout';
import Table from './components/Table/Table';
import { useUsers } from './hooks/';

const App = () => {
	const [userFetchParams, setUserFetchParams] = useState({
		offset: 0,
		limit: 10,
		sort: 'name',
		filter: [],
	});
	const { users, pagination, refetch } = useUsers({
		limit: userFetchParams.limit || 10,
		offset: userFetchParams.offset || 0,
		sort: userFetchParams.sort || 'name',
		filter: userFetchParams.filter || [],
	});
	const tableConfig = {
		columns: [
			{
				key: 'name',
				label: 'Имя',
				sortable: true,
			},
			{
				key: 'email',
				label: 'E-Mail',
				sortable: true,
			},
			{
				key: 'universityName',
				label: 'ВУЗ',
			},
		],
		displayVariants: [
			{
				key: 'table',
			},
			{
				key: 'cards',
			},
		],
	};

	useEffect(() => {
		refetch();
	}, [userFetchParams]);

	return (
		<div className="app">
			<Layout>
				<HeroSection />
				<Table
					setFetchParams={setUserFetchParams}
					pagination={pagination}
					fetchParams={userFetchParams}
					config={tableConfig}
					data={users}
				/>
			</Layout>
		</div>
	);
};

export default App;
