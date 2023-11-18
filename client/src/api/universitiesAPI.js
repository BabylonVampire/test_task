export class UniversitiesAPI {
	static async createUniversity({ name }) {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/university`,
			{
				method: 'POST',
				body: {
					name: name,
				},
			}
		);
		return response.json();
	}
	static async getUniversities() {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/university`,
			{ method: 'GET' }
		);
		return response.json();
	}
	static async getUniversityById(id) {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/university/${id}`,
			{ method: 'GET' }
		);
		return response.json();
	}
	static async updateUniversity(id, { name }) {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/university/${id}`,
			{
				method: 'PUT',
				body: {
					name: name,
				},
			}
		);
		return response.json();
	}
	static async deleteUniversity(id) {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/university/${id}`,
			{ method: 'DELETE' }
		);
		return response.json();
	}
}
