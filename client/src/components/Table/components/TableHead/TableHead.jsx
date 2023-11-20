import React, { useEffect, useState } from 'react';
import { BiIdCard, BiTable } from 'react-icons/bi';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import Cell from '../Cell/Cell';
import './TableHead.css';

/**
 * Компонент, который отображает заголовок таблицы с кнопками для выбора вида отображения данных и сортировки по столбцам.
 * @param {Object} config - объект, содержащий настройки для отображения данных.
 * @param {Function} setFetchParams - функция, которая устанавливает новые параметры для запроса данных с сервера.
 * @param {Function} setDisplayVariant - функция, которая устанавливает новый вид отображения данных.
 * @param {Object} displayVariant - объект, содержащий информацию о текущем виде отображения данных.
 * @returns {JSX.Element} - элемент, который отображает заголовок таблицы.
 */
const TableHead = ({
	config,
	setFetchParams,
	setDisplayVariant,
	displayVariant,
}) => {
	const [direction, setDirection] = useState(true);
	const [sortedField, setSortingField] = useState();

	const changeSelectedSort = (col, dir) => {
		setFetchParams((prev) => ({
			...prev,
			sort: `${dir === false ? '-' : ''}${col}`,
		}));
	};

	useEffect(() => {
		changeSelectedSort(sortedField, direction);
	}, [direction, sortedField]);

	const displayVariantsIcons = {
		cards: { icon: <BiIdCard />, centralizeHead: true },
		table: { icon: <BiTable />, centralizeHead: false },
	};

	return (
		<div className="table-head">
			<div className="table-head__inner-box">
				<div className="table-head__display-variants">
					{config.displayVariants.map((variant) => {
						return (
							<button
								key={variant.key}
								className={`table-head__display-variant-button${
									displayVariant.key === variant.key
										? '__active'
										: ''
								}`}
								onClick={() => setDisplayVariant(variant)}
							>
								{displayVariantsIcons[variant.key].icon}
							</button>
						);
					})}
				</div>
				<div className="table-head__sortable-cell-box">
					{config.columns.map((col) => {
						return (
							<div
								key={col.key}
								style={{
									justifyContent: displayVariantsIcons[
										displayVariant.key
									].centralizeHead
										? 'center'
										: 'normal',
								}}
								className="table-head__sortable-cell"
								onClick={() => {
									setSortingField(col.key);
									setDirection((prev) => !prev);
								}}
							>
								<Cell>{col.label}</Cell>
								<div
									className={`table-head__sort-button${
										col.key === sortedField
											? '__active'
											: ''
									}`}
								>
									{!direction && col.key === sortedField ? (
										<FaChevronUp />
									) : (
										<FaChevronDown />
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="table-head__divider" />
		</div>
	);
};

export default TableHead;
