import React from 'react';
import { FaUser, FaUserGraduate } from 'react-icons/fa';
import './TableCard.css';

/**
 * Компонент карточки с данными.
 * @param {Object} item - объект, содержащий информацию для отображения.
 * @param {Object} config - объект, содержащий настройки для отображения данных.
 * @returns {JSX.Element} - компонент карточки с данными.
 */
const TableCard = ({ item, config }) => {
	return (
		<div className="table-card">
			<div className="table-card__inner-box">
				<div className="table-card__icon-wrapper">
					{item['university'] ? <FaUserGraduate /> : <FaUser />}
				</div>
				{config.columns.map((col) => {
					return (
						<div key={col.key} className="table-card__field">
							{item[col.key]}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TableCard;
