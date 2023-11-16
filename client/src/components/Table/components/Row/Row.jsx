import React from 'react';
import Cell from '../Cell/Cell';
import './Row.css';

const Row = ({ user, config }) => {
	console.log('Rows config', config);
	return (
		<div className="row">
			<div className="row__inner-box">
				{config.columns.map((col) => {
					return <Cell value={user[col.key]} />;
				})}
			</div>
		</div>
	);
};

export default Row;
