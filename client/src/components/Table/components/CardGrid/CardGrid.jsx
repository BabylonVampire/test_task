import React from 'react';
import TableCard from '../TableCard/TableCard';
import './CardGrid.css';

/**
 * Компонент, который отображает данные в виде карточек.
 * @param {Object} config - объект, содержащий настройки для отображения данных.
 * @param {Array} data - массив объектов, содержащих данные для отображения.
 * @returns {JSX.Element} - элемент, который отображает данные в виде карточек.
 */
const CardGrid = ({ config, data }) => {
	return (
		<div className="card-grid">
			{data &&
				data.map((item) => {
					return (
						<TableCard config={config} item={item} key={item.id} />
					);
				})}
		</div>
	);
};

export default CardGrid;
