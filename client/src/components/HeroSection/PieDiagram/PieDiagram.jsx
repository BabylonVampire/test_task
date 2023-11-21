import React from 'react';
import { generatePie } from './utils/generatePie';
import './PieDiagram.css';

/**
 * Компонент круговой диаграммы.
 * @param {number} totalCount - общее количество элементов, по которым отображается статистика.
 * @param {Array} parts - массив объектов, содержащих информацию о каждой секции.
 * @param {string} height - высота диаграммы. По умолчанию 100%.
 * @returns {JSX.Element} - компонент круговой диаграммы.
 */
const PieDiagram = ({ totalCount, parts, height = '100%' }) => {
	return (
		<div className="pie-diagram__box" style={{ height: height }}>
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
							<div
								className="pie-diagram__description-row"
								key={parts.indexOf(part)}
							>
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
