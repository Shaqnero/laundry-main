import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import VirtualizedView from "../components/virtualized-view/virtualized-view";
import { Badge, Card } from "@rneui/themed";
import { services, status, status_color } from "../library";
import { useFetchAllOrders } from "../hooks/useFetchAdminData";

const OrderHistory = () => {
	const { data, loading } = useFetchAllOrders();

	if (loading) {
		return (
			<Text
				style={{
					fontSize: 24,
					margin: 20,
					fontWeight: "bold",
					textAlign: "center",
				}}
			>
				Loading Data...
			</Text>
		);
	}

	return (
		<View style={styles.container}>
			<VirtualizedView>
				{data?.map((order) => (
					<Card containerStyle={styles.card} key={order?.id}>
						<View style={styles.headingContainer}>
							<Text style={styles.cardHeader}>
								Order No: {order?.orderId}
							</Text>
							<Text style={styles.cardHeader}>
								{new Date(
									order?.pickup_date
								).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</Text>
						</View>
						<Card.Divider style={{ marginTop: 20 }} />
						<View
							style={{
								flexDirection: "row",
								gap: 8,
							}}
						>
							<Image
								source={require("../assets/order_img.png")}
							/>
							<View>
								<View>
									{order?.service.map((service, id) => (
										<Text
											style={styles.headingText}
											key={id}
										>
											{services[service]}
										</Text>
									))}
								</View>
								<Badge
									value={status[order?.status]}
									badgeStyle={{
										borderRadius: 10,
										height: 30,
										width: 90,
										backgroundColor:
											status_color[order?.status],
										marginTop: 10,
									}}
									textStyle={{ fontSize: 16 }}
								/>
							</View>
						</View>
					</Card>
				))}
			</VirtualizedView>
		</View>
	);
};

export default OrderHistory;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		gap: 20,
	},
	card: {
		backgroundColor: "#F6B5D4",
		width: "90%",
		alignSelf: "center",
		marginTop: 10,
		borderRadius: 12,
	},
	cardHeader: {
		fontSize: 16,
		fontWeight: "600",
	},
	headingContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	headingText: {
		fontSize: 18,
		fontWeight: "bold",
	},
});
