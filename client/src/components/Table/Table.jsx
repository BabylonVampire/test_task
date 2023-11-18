import React, { useState } from 'react';
import './Table.css';
import TableBody from './components/TableBody/TableBody';
import TableHead from './components/TableHead/TableHead';
import TableFooter from './components/TableFooter/TableFooter';
import CardGrid from './components/CardGrid/CardGrid';
import { BiIdCard, BiTable } from 'react-icons/bi';

const Table = ({ data, config, pagination, fetchParams, setFetchParams }) => {
	const displayVariants = [
		{ key: 'table', icon: <BiTable />, centralizeHead: false },
		{ key: 'cards', icon: <BiIdCard />, centralizeHead: true },
	];
	const [displayVariant, setDisplayVariant] = useState(displayVariants[0]);
	const renderDisplayVariant = (displayVariant) => {
		switch (displayVariant) {
			case 'cards':
				return <CardGrid config={config} data={data} />;

			case 'table':
				return <TableBody config={config} data={data} />;
			default:
				return <></>;
		}
	};
	return (
		<div className="table">
			<TableHead
				config={config}
				fetchParams={fetchParams}
				setFetchParams={setFetchParams}
				displayVariants={displayVariants}
				setDisplayVariant={setDisplayVariant}
				displayVariant={displayVariant}
			/>
			{renderDisplayVariant(displayVariant.key)}
			<TableFooter
				pagination={pagination}
				fetchParams={fetchParams}
				setFetchParams={setFetchParams}
			/>
		</div>
	);
};

export default Table;
