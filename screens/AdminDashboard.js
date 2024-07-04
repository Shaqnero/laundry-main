import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FAB } from "@rneui/themed";
import FirebaseService from "../context/service";
import { useGlobalContext } from "../context/Context";
import { useFetchAllOrders } from "../hooks/useFetchAdminData";

const AdminDashboard = ({ navigation }) => {
	const firebaseService = useMemo(() => new FirebaseService());
	const { setIsAdmin } = useGlobalContext();

	const { data, loading } = useFetchAllOrders();
	const pendingOrder = data?.filter((order) => order.status === "pending");

	const handleLogout = async () => {
		firebaseService.logOut();
		setIsAdmin(false);
	};
	return (
		<View style={styles.container}>
			<Pressable
				style={styles.card}
				onPress={() => navigation.push("Active Orders")}
			>
				<MaterialIcons name="pending-actions" size={40} color="black" />
				{loading ? (
					<Text
						style={{
							fontSize: 30,
							fontWeight: "bold",
							marginTop: 10,
						}}
					>
						Loading active orders...
					</Text>
				) : (
					<>
						<Text
							style={{
								fontSize: 30,
								fontWeight: "bold",
								marginTop: 10,
							}}
						>
							{pendingOrder ? pendingOrder?.length : "0"}
						</Text>
						<Text style={{ fontSize: 24, fontWeight: "bold" }}>
							Active Orders
						</Text>
					</>
				)}
			</Pressable>
			<Pressable
				style={[styles.card, { backgroundColor: "#C1F9C6" }]}
				onPress={() => navigation.push("Order History")}
			>
				<FontAwesome5 name="history" size={40} color="black" />
				<Text style={{ fontSize: 24, fontWeight: "bold" }}>
					Order History
				</Text>
			</Pressable>
			<FAB
				placement="right"
				color="#f02e65"
				size="large"
				title="Logout"
				icon={{ name: "logout", color: "#FFFFFF" }}
				onPress={handleLogout}
			/>
		</View>
	);
};

export default AdminDashboard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		gap: 20,
	},
	card: {
		width: "90%",
		height: 150,
		backgroundColor: "#C18CBC",
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
	},
});
