import React from 'react';
import './TableCard.css';
import { FaUserGraduate, FaUser } from 'react-icons/fa';
import Cell from '../Cell/Cell';

const TableCard = ({ item, config }) => {
	return (
		<div className="table-card">
			<div className="table-card__inner-box">
				<div className="table-card__icon-wrapper">
					{item['university'] ? <FaUserGraduate /> : <FaUser />}
				</div>
				{config.columns.map((col) => {
					return (
						<div className="table-card__field">{item[col.key]}</div>
					);
				})}
			</div>
		</div>
	);
};

export default TableCard;
