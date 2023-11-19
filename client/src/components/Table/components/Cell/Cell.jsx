import React from 'react';
import './Cell.css';

/**
 * Компонент ячейки таблицы.
 * @returns {JSX.Element} - компонент ячейки таблицы.
 */
const Cell = ({ children }) => {
	return <div className="cell">{children}</div>;
};

export default Cell;
