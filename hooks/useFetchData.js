import { useEffect, useMemo, useState } from "react";
import FirebaseService from "../context/service";

export const useFetchAllUsers = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const firebaseService = useMemo(() => new FirebaseService(), []);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setLoading(true);
				const usersData = await firebaseService.getUsers();
				setData(usersData);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};
		fetchUsers();
		return () => {
			// Cleanup function
		};
	}, []);

	return { data, loading, error };
};

export const useFetchUser = (id) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const firebaseService = useMemo(() => new FirebaseService(), []);

	useEffect(() => {
		const handleUserUpdate = (updatedOrders) => {
			setData(updatedOrders);
			setLoading(false);
		};

		if (id) {
			const unsubscribe = firebaseService.getSingleUser(
				id,
				handleUserUpdate
			);
		}

		return () => {
			// Cleanup function
		};
	}, [id]);

	return { data, loading, error };
};

export const useFetchAllOrders = (id) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const firebaseService = useMemo(() => new FirebaseService(), []);

	useEffect(() => {
		const handleOrdersUpdate = (updatedOrders) => {
			setData(updatedOrders);
			setLoading(false);
		};

		const unsubscribe = firebaseService.getOrders(id, handleOrdersUpdate);

		return () => {
			// Cleanup function to stop listening when the component unmounts
			// unsubscribe();
		};
	}, [id]);

	return { data, loading, error };
};

export const useFetchOrder = (id) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const firebaseService = useMemo(() => new FirebaseService(), []);

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				setLoading(true);
				const userData = await firebaseService.getSingleOrder(id);
				setData(userData);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		if (id) {
			fetchOrder();
		}

		return () => {
			// Cleanup function
		};
	}, [id]);

	return { data, loading, error };
};
