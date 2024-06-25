import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AllOrderCard from "../components/all-orders/card";
import { useGlobalContext } from "../context/Context";
import { useFetchAllOrders } from "../hooks/useFetchData";
import VirtualizedView from "../components/virtualized-view/virtualized-view";

const AllOrders = ({ navigation }) => {
	const { user } = useGlobalContext();

	const { data, loading } = useFetchAllOrders(user?.uid);
	return (
		<SafeAreaView style={styles.container}>
			{loading ? (
				<Text
					style={{
						textAlign: "center",
						fontWeight: "bold",
						fontSize: 24,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Loading
				</Text>
			) : (
				<VirtualizedView>
					<AllOrderCard orders={data} navigation={navigation} />
				</VirtualizedView>
			)}
		</SafeAreaView>
	);
};

export default AllOrders;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
