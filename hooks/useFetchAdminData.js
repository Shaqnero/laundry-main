import { useEffect, useMemo, useState } from "react";
import FirebaseAdmin from "../context/admin";

export const useFetchAllOrders = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const firebaseAdmin = useMemo(() => new FirebaseAdmin());

	useEffect(() => {
		const handleOrdersUpdate = (updatedOrders) => {
			setData(updatedOrders);
			setLoading(false);
		};

		const unsubscribe = firebaseAdmin.getOrders(handleOrdersUpdate);

		return () => {
			// Cleanup function to stop listening when the component unmounts
			// unsubscribe();
		};
	}, []);

	return { data, loading, error };
};
