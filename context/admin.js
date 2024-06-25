import { auth, db } from "../firebase/firebase";
import {
	collection,
	addDoc,
	doc,
	getDoc,
	updateDoc,
	deleteDoc,
	query,
	getDocs,
	orderBy,
	getFirestore,
	where,
	onSnapshot,
} from "firebase/firestore";

class FirebaseAdmin {
	async getOrders(onData) {
		try {
			const ordersRef = collection(db, "orders");
			const q = query(ordersRef, orderBy("pickup_date", "desc"));

			// Subscribe to real-time changes using onSnapshot
			const unsubscribe = onSnapshot(q, (ordersQuerySnapshot) => {
				const orders = [];
				ordersQuerySnapshot.forEach((doc) => {
					orders.push({
						id: doc.id,
						...doc.data(),
					});
				});

				// Call the provided onData callback with the updated orders
				onData(orders);
			});

			// Return the unsubscribe function to stop listening
			return unsubscribe;
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default FirebaseAdmin;
