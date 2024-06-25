import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Services from "../components/home/services";
import Hero from "../components/home/hero";
import ActiveOrder from "../components/home/active-order";
import { useGlobalContext } from "../context/Context";
import { useFetchAllOrders } from "../hooks/useFetchData";

// navigation prop comes when we wrap the component around stack.navigator
const HomeScreen = ({ navigation }) => {
	const { user } = useGlobalContext();

	const { data } = useFetchAllOrders(user?.uid);
	const order = data?.filter((order) => order.status === "pending");
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Hero navigation={navigation} />
				<Services />
				<ActiveOrder orders={order} navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
