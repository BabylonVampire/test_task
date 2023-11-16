import React from 'react';
import './Table.css';
import TableBody from './components/TableBody/TableBody';
import TableHead from './components/TableHead/TableHead';

const Table = ({ users, config }) => {
	console.log(config);
	return (
		<div className="table">
			<TableHead config={config} />
			<TableBody config={config} users={users} />
		</div>
	);
};

export default Table;
