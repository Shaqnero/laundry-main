import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
} from "firebase/auth";
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

class FirebaseService {
	async signUp(email, password) {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			return user;
		} catch (error) {
			throw error;
		}
	}

	async logIn(email, password) {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			return user;
		} catch (error) {
			throw error;
		}
	}

	async logOut() {
		try {
			await signOut(auth);
		} catch (error) {
			throw error;
		}
	}

	async addUserDetails({ email, location, name, phone, uid, plan }) {
		try {
			await addDoc(collection(db, "users"), {
				email,
				location,
				name,
				phone,
				uid,
				plan,
			});
		} catch (error) {
			console.log(error);
		}
	}

	async resetPassword(email) {
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			throw error;
		}
	}

	async getUsers() {
		try {
			const usersRef = collection(db, "users");
			// const q = query(usersRef, orderBy("created_at", "desc"));
			const usersQuerySnapshot = await getDocs(usersRef);
			const users = [];
			usersQuerySnapshot.forEach((doc) => {
				users.push({
					id: doc.id,
					...doc.data(),
				});
			});
			return users;
		} catch (error) {
			return {
				message: error?.message,
				error: error,
			};
		}
	}

	/* 
	/* Gets orders in real time
	*/
	async getOrders(id, onData) {
		try {
			const ordersRef = collection(db, "orders");
			const q = query(
				ordersRef,
				where("uid", "==", id),
				orderBy("pickup_date", "desc")
			);

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

	async getSingleUser(id, onData) {
		try {
			if (!id) {
				throw new Error("User ID is empty.");
			}

			const collectionRef = collection(db, "users");
			const q = query(collectionRef, where("uid", "==", id));

			// Subscribe to real-time changes using onSnapshot
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				let data = {};
				querySnapshot.forEach((doc) => {
					// Access the document data
					data = { ...doc.data(), id: doc.id };
				});

				// Call the provided onData callback with the updated user data
				onData(data);
			});

			// Return the unsubscribe function to stop listening
			return unsubscribe;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async addOrder({
		email,
		location,
		name,
		phone,
		uid,
		service,
		payment_method,
		pickup_date,
		notes,
		status,
		orderId,
	}) {
		try {
			await addDoc(collection(db, "orders"), {
				email,
				location,
				name,
				phone,
				uid,
				service,
				payment_method,
				pickup_date,
				notes,
				status,
				orderId,
			});
		} catch (error) {
			throw error;
		}
	}

	async changeOrderStatus(id, status) {
		try {
			const orderDocRef = doc(db, "orders", id);
			const orderDocSnap = await getDoc(orderDocRef);
			if (orderDocSnap.exists()) {
				const orderData = orderDocSnap.data();
				const updatedData = {
					...orderData,
					status,
					updated_at: new Date().toISOString(),
				};
				await updateDoc(orderDocRef, updatedData);
				return id;
			} else {
				throw new Error("order does not exist.");
			}
		} catch (error) {
			throw new error();
		}
	}

	async changePlan(id, plan) {
		try {
			const orderDocRef = doc(db, "users", id);
			const orderDocSnap = await getDoc(orderDocRef);
			if (orderDocSnap.exists()) {
				const orderData = orderDocSnap.data();
				const updatedData = {
					...orderData,
					plan,
					updated_at: new Date().toISOString(),
				};
				await updateDoc(orderDocRef, updatedData);
				return id;
			} else {
				throw new Error("order does not exist.");
			}
		} catch (error) {
			throw new error();
		}
	}

	async getSingleOrder(id) {
		try {
			if (!id) {
				throw new Error("Order ID is empty.");
			}
			const orderDocRef = doc(db, "orders", id);
			const orderDocSnap = await getDoc(orderDocRef);
			if (orderDocSnap.exists()) {
				const orderData = orderDocSnap.data();
				return orderData;
			} else {
				throw new Error("Order does not exist.");
			}
		} catch (error) {
			return {
				message: error?.message,
				error: error,
			};
		}
	}
}

export default FirebaseService;
