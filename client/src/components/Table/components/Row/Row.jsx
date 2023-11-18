import React from 'react';
import Cell from '../Cell/Cell';
import './Row.css';

const Row = ({ item, config }) => {
	return (
		<div className="row">
			<div className="row__inner-box">
				{config.columns.map((col) => {
					return <Cell>{item[col.key]}</Cell>;
				})}
			</div>
		</div>
	);
};

export default Row;
