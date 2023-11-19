/**
 * Функция для создания строки, представляющая собой содержимое conic-gradient() для отображения пользовательской статистики.
 * @param {Array} parts - массив объектов, содержащих информацию о каждой секции.
 * @param {number} totalCount - общее количество элементов, по которым отображается статистика.
 * @returns {string} - строка, представляющая собой содержимое conic-gradient() для отображения пользовательской статистики.
 */
export const generatePie = (parts, totalCount) => {
	let percent = 0;
	const totalSize = parts.reduce((sum, part) => sum + part.size, 0);
	let cssString = parts
		.map((part) => {
			const partString = `${part.color} ${percent}%, ${part.color} ${
				percent + Math.round((part.size / totalCount) * 100)
			}%`;
			percent += Math.round((part.size / totalCount) * 100);
			return partString;
		})
		.join(', ');
	if (totalSize < totalCount) {
		cssString += `, #b3b3b3 ${percent}%, #b3b3b3 100%`;
	}
	return cssString;
};
