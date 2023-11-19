import React from 'react';
import Row from '../Row/Row';
import './TableBody.css';

/**
 * Компонент тела таблицы.
 * @param {Array} data - массив объектов, содержащих данные для отображения.
 * @param {Object} config - объект, содержащий настройки для отображения данных.
 * @returns {JSX.Element} - компонент строки таблицы.
 */
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
