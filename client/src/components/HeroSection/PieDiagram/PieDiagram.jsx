import React from 'react';
import { generatePie } from './utils/generatePie';
import './PieDiagram.css';

const PieDiagram = ({ totalCount, parts }) => {
	return (
		<div className="pie-diagram__box">
			<div className="pie-diagram__inner-box">
				<div
					className="pie-diagram"
					style={{
						backgroundImage: `conic-gradient(${generatePie(
							parts,
							totalCount
						)})`,
					}}
				/>
				<div className="pie-diagram__description-box">
					{parts.map((part) => {
						return (
							<div className="pie-diagram__description-row">
								<div
									className="pie-diagram__description-point"
									style={{ backgroundColor: part.color }}
								/>
								<div className="pie-diagram__description-text">
									{part.field}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default PieDiagram;
