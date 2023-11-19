import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import './TableFooter.css';

/**
 * Компонент, который отображает низ таблицы с информацией о пагинации и кнопками для перехода по страницам.
 * @param {Object} pagination - объект, содержащий информацию о пагинации.
 * @param {Object} fetchParams - объект, содержащий параметры для запроса данных с сервера.
 * @param {Function} setFetchParams - функция, которая устанавливает новые параметры для запроса данных с сервера.
 * @returns {JSX.Element} - Компонент, который отображает низ таблицы.
 */
const TableFooter = ({ pagination, fetchParams, setFetchParams }) => {
	const forwardButton = () => {
		setFetchParams((prev) => ({
			...prev,
			offset: prev.offset + fetchParams.limit,
		}));
	};
	const backwardButton = () => {
		setFetchParams((prev) => ({
			...prev,
			offset: prev.offset - fetchParams.limit,
		}));
	};

	return (
		<div className="table-footer">
			<div className="table-footer__divider" />
			<div className="table-footer__inner-box">
				<div className="table-footer__count">
					{`${fetchParams.offset + 1}-${Math.min(
						fetchParams.offset + pagination.size,
						pagination.totalCount
					)} из ${pagination.totalCount}`}
					<div className="table-footer__button-box">
						<button
							className={`table-footer__backward-arrow${
								fetchParams.offset === 0 ? '__disabled' : ''
							}`}
							onClick={backwardButton}
						>
							<FaChevronLeft />
						</button>
						<button
							className={`table-footer__forward-arrow${
								fetchParams.offset + pagination.size >=
								pagination.totalCount
									? '__disabled'
									: ''
							}`}
							onClick={forwardButton}
						>
							<FaChevronRight />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TableFooter;
