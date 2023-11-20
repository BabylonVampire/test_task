import { useState, useEffect } from 'react';
import { UniversitiesAPI } from '../api';
/**
 * Хук, использующийся для получения выбранного университета.
 * @param {number} id - id университета.
 * @returns {object} Объект, содержащий массив университетов и функцию для повторного запроса.
 */
export function useUniversity(id) {
	const [university, setUniversity] = useState();

	const fetchUniversity = async () => {
		try {
			const response = await UniversitiesAPI.getUniversity(id);
			setUniversity(response);
		} catch (error) {
			console.error(error);
		}
	};

	const refetch = () => {
		fetchUniversity();
	};

	useEffect(() => {
		fetchUniversity();
	}, []);

	return { university, refetch };
}
