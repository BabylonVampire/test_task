import React from 'react';
import Cell from '../Cell/Cell';
import './TableHead.css';

const TableHead = ({ config }) => {
	return (
		<div className="table-head">
			<div className="table-head__inner-box">
				{config.columns.map((col) => {
					return <Cell key={col.key} value={col.label} />;
				})}
			</div>
			<div className="table-head__divider" />
		</div>
	);
};

export default TableHead;
