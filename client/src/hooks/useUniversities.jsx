import { useState, useEffect } from 'react';
import { UniversitiesAPI } from '../api';
/**
 * Хук, использующийся для получения списка университетов.
 * @returns {object} Объект, содержащий массив университетов и функцию для повторного запроса.
 */
export function useUniversities() {
	const [universities, setUniversities] = useState([]);

	const fetchUniversities = async () => {
		try {
			const response = await UniversitiesAPI.getUniversities();
			setUniversities(response);
		} catch (error) {
			console.error(error);
		}
	};

	const refetch = () => {
		fetchUniversities();
	};

	useEffect(() => {
		fetchUniversities();
	}, []);

	return { universities, refetch };
}
