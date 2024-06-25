import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Button, Card } from "@rneui/themed";
import { services, status, status_color } from "../../library";
import FirebaseService from "../../context/service";
import Toast from "react-native-root-toast";
import CancelOrderModal from "./modals/cancel-order";

const ActiveOrder = ({ orders, navigation }) => {
	const [loading, setLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const firebaseService = useMemo(() => new FirebaseService(), []);

	const order = orders?.[0];

	const cancelOrder = async (id, status) => {
		setLoading(true);
		try {
			await firebaseService.changeOrderStatus(id, status);
			Toast.show("Order Cancelled Successfully", {
				duration: Toast.durations.LONG,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
			});
		} catch (error) {
			console.log(error);
			Toast.show("Something went wrong", {
				duration: Toast.durations.LONG,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
				backgroundColor: "red",
				textColor: "white",
			});
		} finally {
			setLoading(false);
			setIsVisible(false);
		}
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.headingContainer}>
					<Text style={styles.headingText}>
						Current active order appears here
					</Text>
					<Button
						size="sm"
						type="clear"
						onPress={() => navigation.navigate("All Orders")}
					>
						All Orders
					</Button>
				</View>

				{orders?.length > 0 ? (
					<>
						<Card containerStyle={styles.card}>
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
							<Card.Divider />
							<View style={styles.orderBody}>
								<View style={{ flexDirection: "row", gap: 8 }}>
									<Image
										source={require("../../assets/order_img.png")}
									/>
									<View>
										<View>
											{order?.service.map(
												(service, id) => (
													<Text
														style={
															styles.headingText
														}
														key={id}
													>
														{services[service]}
													</Text>
												)
											)}
										</View>
										<Text
											style={[
												styles.headingText,
												{
													color: status_color[
														order?.status
													],
												},
											]}
										>
											{status[order?.status]}
										</Text>
										<Text
											style={[
												styles.headingText,
												{ fontSize: 16 },
											]}
										>
											{
												new Date(order?.pickup_date)
													.toTimeString()
													.split(" ")[0]
											}
										</Text>
									</View>
								</View>
								<View style={{ gap: 8 }}>
									<Button
										size="sm"
										type="solid"
										color={"transparent"}
										containerStyle={{
											alignSelf: "center",
											borderRadius: 10,
											borderWidth: 1,
										}}
										titleStyle={{ color: "black" }}
										onPress={() =>
											navigation.navigate(
												"Order Details",
												{
													id: order.id,
												}
											)
										}
									>
										Details
									</Button>
									{order?.status === "pending" && (
										<Button
											size="sm"
											type="solid"
											color={"error"}
											containerStyle={{
												alignSelf: "center",
												borderRadius: 10,
											}}
											onPress={() => {
												setIsVisible(true);
											}}
										>
											Cancel
										</Button>
									)}
								</View>
							</View>
						</Card>
					</>
				) : (
					<Text
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: 20,
						}}
					>
						You have no pending orders
					</Text>
				)}
			</View>

			<CancelOrderModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={loading}
				cancelOrder={cancelOrder}
				order={order}
			/>
		</>
	);
};

export default ActiveOrder;

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		width: "90%",
		alignSelf: "center",
		marginBottom: 20,
	},
	headingContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	headingText: {
		fontSize: 16,
		fontWeight: "bold",
		alignSelf: "center",
	},
	card: {
		backgroundColor: "#FEE5F9",
		width: "100%",
		alignSelf: "center",
		marginTop: 10,
	},
	cardHeader: {
		fontSize: 16,
		fontWeight: "600",
	},
	orderBody: {
		flexDirection: "row",
		gap: 10,
		justifyContent: "space-between",
	},
});
