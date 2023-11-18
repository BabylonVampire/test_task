export class UsersAPI {
	static async createUser({ name, email, universityId }) {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
			method: 'POST',
			body: {
				name: name,
				email: email,
				universityId: universityId || null,
			},
		});
		return response.json();
	}
	static async getUserById(id) {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/user/${id}`,
			{
				method: 'GET',
			}
		);
		return response.json();
	}
	static async getUsers({ limit, offset, sort }) {
		const params = new URLSearchParams();
		if (limit) params.append('limit', limit);
		if (offset !== undefined) params.append('offset', offset);
		if (sort) params.append('sort', sort);
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/user?${params.toString()}`,
			{
				method: 'GET',
			}
		);
		return response.json();
	}
	static updateUser(id, { name, email, universityId }) {
		const response = fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
			method: 'PUT',
			body: {
				name: name,
				email: email,
				universityId: universityId || null,
			},
		});
		return response.json();
	}
	static async deleteUser(id) {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/user/${id}`,
			{
				method: 'DELETE',
			}
		);
		return response.json();
	}
}
