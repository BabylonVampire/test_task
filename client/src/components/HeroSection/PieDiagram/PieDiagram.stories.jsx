import PieDiagram from './PieDiagram';

export default {
	title: 'Charts/PieDiagram',
	component: PieDiagram,
};
export const Base = {
	args: {
		height: '300px',
		totalCount: 10,
		parts: [
			{ color: 'red', size: 4, field: '1 место' },
			{ color: 'green', size: 3, field: '2 место' },
			{ color: 'blue', size: 2, field: '3 место' },
		],
	},
};
export const TotalCountEqualsToSum = {
	args: {
		height: '300px',
		totalCount: 10,
		parts: [
			{ color: 'red', size: 5, field: '1 место' },
			{ color: 'green', size: 3, field: '2 место' },
			{ color: 'blue', size: 2, field: '3 место' },
		],
	},
};
export const VeryBigTotalCount = {
	args: {
		height: '300px',
		totalCount: 1000,
		parts: [
			{ color: 'red', size: 5, field: '1 место' },
			{ color: 'green', size: 3, field: '2 место' },
			{ color: 'blue', size: 2, field: '3 место' },
		],
	},
};
