import { useState, useEffect } from 'react';
import { UniversitiesAPI } from '../api';

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
