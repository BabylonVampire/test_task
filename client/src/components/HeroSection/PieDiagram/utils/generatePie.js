// parts: {color: string, size: number}[]
export const generatePie = (parts, totalCount) => {
	let percent = 0;
	const totalSize = parts.reduce((sum, part) => sum + part.size, 0); // сумма всех size
	let cssString = parts
		.map((part) => {
			const partString = `${part.color} ${percent}%, ${part.color} ${
				percent + Math.round((part.size / totalCount) * 100)
			}%`; // переводим size в проценты
			percent += Math.round((part.size / totalCount) * 100);
			return partString;
		})
		.join(', ');
	if (totalSize < totalCount) {
		// добавляем серую долю, если есть остаток
		cssString += `, #b3b3b3 ${percent}%, #b3b3b3 100%`;
	}
	return cssString;
};
