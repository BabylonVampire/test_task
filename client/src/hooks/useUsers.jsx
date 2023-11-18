import { useState, useEffect } from 'react';
import { UsersAPI, UniversitiesAPI } from '../api/';

// Хук useUsers принимает объект с параметрами запроса
// и возвращает объект с полями:
// users - массив пользователей
// pagination - объект с информацией о пагинации
// createUser - функция для создания пользователя
// updateUser - функция для обновления пользователя по id
// deleteUser - функция для удаления пользователя по id
// refetch - функция для повторного запроса пользователей с теми же параметрами
export function useUsers({ limit, offset, sort }) {
	// Состояние для хранения пользователей и пагинации
	const [users, setUsers] = useState([]);
	const [pagination, setPagination] = useState({});

	// Функция для получения пользователей с бэкенда
	const fetchUsers = async () => {
		try {
			// Вызываем метод getUsers из класса UsersAPI
			const response = await UsersAPI.getUsers({
				limit,
				offset,
				sort,
			});
			// Обновляем состояние с полученными данными
			console.log(response.data);
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
			// Обрабатываем ошибку
			console.error(error);
		}
	};

	// Функция для создания пользователя на бэкенде
	const createUser = async ({ name, email, universityId }) => {
		try {
			// Вызываем метод createUser из класса UsersAPI
			const response = await UsersAPI.createUser({
				name,
				email,
				universityId,
			});
			// Добавляем нового пользователя в состояние
			setUsers((prevUsers) => [...prevUsers, response.data]);
			// Обновляем пагинацию
			setPagination((prevPagination) => ({
				...prevPagination,
				totalCount: prevPagination.totalCount + 1,
				totalPages: Math.ceil(
					(prevPagination.totalCount + 1) / prevPagination.size
				),
			}));
		} catch (error) {
			// Обрабатываем ошибку
			console.error(error);
		}
	};

	// Функция для обновления пользователя по id на бэкенде
	const updateUser = async (id, { name, email, universityId }) => {
		try {
			// Вызываем метод updateUser из класса UsersAPI
			const response = await UsersAPI.updateUser(id, {
				name,
				email,
				universityId,
			});
			// Обновляем пользователя в состоянии
			setUsers((prevUsers) =>
				prevUsers.map((user) => (user.id === id ? response : user))
			);
		} catch (error) {
			// Обрабатываем ошибку
			console.error(error);
		}
	};

	// Функция для удаления пользователя по id на бэкенде
	const deleteUser = async (id) => {
		try {
			// Вызываем метод deleteUser из класса UsersAPI
			await UsersAPI.deleteUser(id);
			// Удаляем пользователя из состояния
			setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
			// Обновляем пагинацию
			setPagination((prevPagination) => ({
				...prevPagination,
				totalCount: prevPagination.totalCount - 1,
				totalPages: Math.ceil(
					(prevPagination.totalCount - 1) / prevPagination.size
				),
			}));
		} catch (error) {
			// Обрабатываем ошибку
			console.error(error);
		}
	};

	// Функция для повторного запроса пользователей с теми же параметрами
	const refetch = () => {
		fetchUsers();
	};

	// Вызываем функцию fetchUsers при первом рендере компонента
	useEffect(() => {
		fetchUsers();
	}, []);

	// Возвращаем объект с полями:
	// users - массив пользователей
	// pagination - объект с информацией о пагинации
	// createUser - функция для создания пользователя
	// updateUser - функция для обновления пользователя по id
	// deleteUser - функция для удаления пользователя по id
	// refetch - функция для повторного запроса пользователей с теми же параметрами
	return { users, pagination, createUser, updateUser, deleteUser, refetch };
}
