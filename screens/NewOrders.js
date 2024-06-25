import { StyleSheet, Text, View } from "react-native";
import React from "react";
import VirtualizedView from "../components/virtualized-view/virtualized-view";
import NewOrderCard from "../components/new-orders/new-order-card";
import { useFetchAllOrders } from "../hooks/useFetchAdminData";

const NewOrders = ({ navigation }) => {
	const { data, loading } = useFetchAllOrders();
	const pendingOrder = data?.filter((order) => order.status === "pending");

	if (loading) {
		return (
			<Text
				style={{
					fontSize: 22,
					fontWeight: "bold",
					margin: 20,
					textAlign: "center",
				}}
			>
				Loading Data
			</Text>
		);
	}

	return (
		<VirtualizedView>
			<NewOrderCard navigate={navigation} orders={pendingOrder} />
		</VirtualizedView>
	);
};

export default NewOrders;

const styles = StyleSheet.create({});
