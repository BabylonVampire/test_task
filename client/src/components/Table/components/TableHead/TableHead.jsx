import React, { useState, useEffect } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6';

import Cell from '../Cell/Cell';
import './TableHead.css';

const TableHead = ({
	config,
	fetchParams,
	setFetchParams,
	displayVariants,
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

	return (
		<div className="table-head">
			<div className="table-head__inner-box">
				<div className="table-head__display-variants">
					{displayVariants.map((variant) => {
						return (
							<button
								className={`table-head__display-variant-button${
									displayVariant.key === variant.key
										? '__active'
										: ''
								}`}
								onClick={() => setDisplayVariant(variant)}
							>
								{variant.icon}
							</button>
						);
					})}
				</div>
				<div className="table-head__sortable-cell-box">
					{config.columns.map((col) => {
						return (
							<div
								style={{
									justifyContent:
										displayVariant.centralizeHead
											? 'center'
											: 'normal',
								}}
								className="table-head__sortable-cell"
								onClick={() => {
									setSortingField(col.key);
									setDirection((prev) => !prev);
								}}
							>
								<Cell key={col.key}>{col.label}</Cell>
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
