import React from 'react';
import TableCard from '../TableCard/TableCard';
import './CardGrid.css';

const CardGrid = ({ config, data }) => {
	return (
		<div className="card-grid">
			{data.map((item) => {
				return <TableCard config={config} item={item} key={item.id} />;
			})}
		</div>
	);
};

export default CardGrid;
