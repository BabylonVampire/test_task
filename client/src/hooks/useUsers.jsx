import { useEffect, useState } from 'react';
import { UsersAPI } from '../api/';
/**
 * Хук, использующийся для получения и изменения списка пользователей.
 * @param {number} limit - Лимит количества пользователей на странице.
 * @param {number} offset - Смещение от начала списка пользователей.
 * @param {string} sort - Порядок сортировки пользователей.
 * @returns {object} Объект, содержащий массив пользователей, объект пагинации и функции для создания, обновления и удаления пользователей.
 */
export function useUsers({ limit, offset, sort }) {
	const [users, setUsers] = useState([]);
	const [pagination, setPagination] = useState({});

	const fetchUsers = async () => {
		try {
			const response = await UsersAPI.getUsers({
				limit,
				offset,
				sort,
			});
			setUsers(
				response.data.map((user) => ({
					...user,
					universityName: user.university
						? user.university.name
						: undefined,
				}))
			);
			setPagination(response.pagination);
		} catch (error) {
			console.error(error);
		}
	};

	const createUser = async ({ name, email, universityId }) => {
		try {
			const response = await UsersAPI.createUser({
				name,
				email,
				universityId,
			});
			setUsers((prevUsers) => [...prevUsers, response.data]);
			setPagination((prevPagination) => ({
				...prevPagination,
				totalCount: prevPagination.totalCount + 1,
				totalPages: Math.ceil(
					(prevPagination.totalCount + 1) / prevPagination.size
				),
			}));
		} catch (error) {
			console.error(error);
		}
	};

	const updateUser = async (id, { name, email, universityId }) => {
		try {
			const response = await UsersAPI.updateUser(id, {
				name,
				email,
				universityId,
			});
			setUsers((prevUsers) =>
				prevUsers.map((user) => (user.id === id ? response : user))
			);
		} catch (error) {
			console.error(error);
		}
	};

	const deleteUser = async (id) => {
		try {
			await UsersAPI.deleteUser(id);
			setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
			setPagination((prevPagination) => ({
				...prevPagination,
				totalCount: prevPagination.totalCount - 1,
				totalPages: Math.ceil(
					(prevPagination.totalCount - 1) / prevPagination.size
				),
			}));
		} catch (error) {
			console.error(error);
		}
	};

	const refetch = () => {
		fetchUsers();
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return { users, pagination, createUser, updateUser, deleteUser, refetch };
}
