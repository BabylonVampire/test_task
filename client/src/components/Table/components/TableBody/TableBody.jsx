import React from 'react';
import Row from '../Row/Row';
import './TableBody.css';

const TableBody = ({ config, users }) => {
	return (
		<div className="table-body">
			{users.map((user) => {
				return <Row key={user.id} user={user} config={config} />;
			})}
		</div>
	);
};

export default TableBody;
