import React from 'react';
import { BiIdCard, BiTable } from 'react-icons/bi';
import { FaUniversity } from 'react-icons/fa';
import { FaChevronDown, FaChevronUp, FaUserPlus } from 'react-icons/fa6';
import { useAppDispatch } from '../../../../store/hooks/redux';
import { modalSlice } from '../../../../store/reducers/ModalSlice';
import Select from '../../../Select/Select';
import Cell from '../Cell/Cell';
import './TableHead.css';

const TableHead = ({
	config,
	setFetchParams,
	setDisplayVariant,
	displayVariant,
	fetchParams,
}) => {
	const changeSelectedSort = (col, dir) => {
		setFetchParams((prev) => ({
			...prev,
			sort: `${dir === false ? '-' : ''}${col}`,
		}));
	};

	const displayVariantsIcons = {
		cards: { icon: <BiIdCard />, centralizeHead: true },
		table: { icon: <BiTable />, centralizeHead: false },
	};

	const dispatch = useAppDispatch();
	const { changeModal } = modalSlice.actions;

	return (
		<div className="table-head">
			<div className="table-head__inner-box">
				<div className="table-head__settings-box">
					<div className="table-head__add-to-db-buttons">
						<button
							className="table-head__add-button"
							onClick={() => dispatch(changeModal('createUser'))}
						>
							<FaUserPlus />
						</button>
						<button
							className="table-head__add-button"
							onClick={() =>
								dispatch(changeModal('createUniversity'))
							}
						>
							<FaUniversity />
						</button>
					</div>
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
				</div>

				<div className="table-head__sortable-cell-box">
					{config.columns.map((col) => {
						return (
							<div key={col.key}>
								{!col.filter ? (
									<div
										key={col.key}
										style={{
											justifyContent:
												displayVariantsIcons[
													displayVariant.key
												].centralizeHead
													? 'center'
													: 'normal',
										}}
										className="table-head__sortable-cell"
										onClick={() => {
											changeSelectedSort(
												col.key,
												fetchParams.sort.includes('-')
											);
										}}
									>
										<Cell>{col.label}</Cell>
										<div
											className={`table-head__sort-button${
												col.key ===
												fetchParams.sort.substr(
													+fetchParams.sort.includes(
														'-'
													)
												)
													? '__active'
													: ''
											}`}
										>
											{!fetchParams.sort.includes('-') &&
											col.key ===
												fetchParams.sort.substr(
													+fetchParams.sort.includes(
														'-'
													)
												) ? (
												<FaChevronUp />
											) : (
												<FaChevronDown />
											)}
										</div>
									</div>
								) : (
									<div
										style={{
											justifyContent:
												displayVariantsIcons[
													displayVariant.key
												].centralizeHead
													? 'center'
													: 'normal',
										}}
										className="table-head__filterable-cell"
									>
										<Cell>{col.label}</Cell>
										<div className="table-head__filter-button__active">
											<Select
												options={[
													...col.filterParams.map(
														(prop) => prop.name
													),
													'Не выбрано',
												]}
												onChange={col.onChange}
												defaultValue={
													fetchParams.universityId
														? col.filterParams.find(
																(un) =>
																	un.id ==
																	fetchParams.universityId
														  )?.name
														: 'Не выбрано'
												}
											/>
										</div>
									</div>
								)}
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
