import React from 'react';
import Cell from '../Cell/Cell';
import './Row.css';

/**
 * Компонент строки таблицы.
 * @param {Object} item - объект, содержащий информацию для отображения.
 * @param {Object} config - объект, содержащий настройки для отображения данных.
 * @returns {JSX.Element} - компонент строки таблицы.
 */
const Row = ({ item, config }) => {
	return (
		<div className="row">
			<div className="row__inner-box">
				{config.columns.map((col) => {
					return <Cell key={col.key}>{item[col.key]}</Cell>;
				})}
			</div>
		</div>
	);
};

export default Row;
