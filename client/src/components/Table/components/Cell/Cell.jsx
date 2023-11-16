import React from 'react';
import './Cell.css';

const Cell = ({ value }) => {
	return <div className="cell">{value}</div>;
};

export default Cell;
