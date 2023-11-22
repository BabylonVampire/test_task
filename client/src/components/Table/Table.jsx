import React, { useState } from 'react';
import './Table.css';
import CardGrid from './components/CardGrid/CardGrid';
import TableBody from './components/TableBody/TableBody';
import TableFooter from './components/TableFooter/TableFooter';
import TableHead from './components/TableHead/TableHead';

/**
 * Компонент, который отображает данные в виде таблицы или карточек.
 * @param {Array} data - массив объектов, содержащих данные для отображения.
 * @param {Object} config - объект, содержащий настройки для отображения данных.
 * @param {Object} pagination - объект, содержащий информацию о пагинации.
 * @param {Object} fetchParams - объект, содержащий параметры для запроса данных с сервера.
 * @param {Function} setFetchParams - функция, которая устанавливает новые параметры для запроса данных с сервера.
 * @returns {JSX.Element} - элемент, который отображает данные в виде таблицы или карточек.
 */
const Table = ({ data, config, pagination, fetchParams, setFetchParams }) => {
	if (!fetchParams) {
		fetchParams = {
			offset: 0,
			limit: 10,
			sort: 'name',
			universityId: undefined,
		};
	}
	if (!pagination) {
		pagination = {
			page: 1,
			size: 1,
			totalCount: 1,
			totalPages: 1,
		};
	}
	const [displayVariant, setDisplayVariant] = useState(
		config.displayVariants[1]
	);
	const renderDisplayVariant = (displayVariant) => {
		switch (displayVariant) {
			case 'cards':
				return <CardGrid config={config} data={data} />;
			case 'table':
				return <TableBody config={config} data={data} />;
			default:
				return <></>;
		}
	};

	return (
		<div className="table">
			<TableHead
				config={config}
				setFetchParams={setFetchParams}
				setDisplayVariant={setDisplayVariant}
				displayVariant={displayVariant}
				fetchParams={fetchParams}
			/>
			{renderDisplayVariant(displayVariant.key)}
			<TableFooter
				pagination={pagination}
				fetchParams={fetchParams}
				setFetchParams={setFetchParams}
			/>
		</div>
	);
};

export default Table;
