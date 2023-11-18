import React from 'react';
import Row from '../Row/Row';
import './TableBody.css';

const TableBody = ({ config, data }) => {
	return (
		<div className="table-body">
			{data.map((row) => {
				return <Row key={row.id} item={row} config={config} />;
			})}
		</div>
	);
};

export default TableBody;
