import { Image, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Badge, Button, Card } from "@rneui/themed";
import { services, status, status_color } from "../../library";
import FirebaseService from "../../context/service";
import Toast from "react-native-root-toast";
import CancelOrderModal from "../home/modals/cancel-order";
import CompleteOrderModal from "./complete-order";

const NewOrderCard = ({ navigate, orders }) => {
	const [loading, setLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isCompletedVisible, setIsCompletedVisible] = useState(false);
	const [deleteInfo, setDeleteInfo] = useState(null);

	const firebaseService = useMemo(() => new FirebaseService(), []);

	const cancelOrder = async (id, status) => {
		setLoading(true);

		try {
			await firebaseService.changeOrderStatus(id, status);
			Toast.show(`Order ${status} Successfully`, {
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
		}
	};

	return (
		<>
			<View style={styles.container}>
				{orders?.map((order) => (
					<Card key={order.id} containerStyle={styles.card}>
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
								source={require("../../assets/order_img.png")}
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
								<Text
									style={[
										styles.headingText,
										{
											color: status_color[order?.status],
										},
									]}
								>
									{status[order.status]}
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
						<View
							style={{
								flexDirection: "row",
								gap: 6,
								marginTop: 20,
							}}
						>
							<Button
								size="sm"
								type="solid"
								color={"transparent"}
								containerStyle={{
									alignSelf: "center",
									marginBottom: 0,
								}}
								buttonStyle={{
									paddingVertical: 4,
									paddingHorizontal: 7,
									borderRadius: 50,
									borderWidth: 2,
									borderStyle: "solid",
									borderColor: "black",
								}}
								titleStyle={{ color: "#000" }}
								onPress={() =>
									navigate.navigate("Order Details", {
										id: order.id,
									})
								}
							>
								Order Details
							</Button>
							<Badge
								value="Complete"
								status="success"
								badgeStyle={{
									borderRadius: 10,
									height: 35,
									width: 100,
								}}
								textStyle={{ fontSize: 16 }}
								onPress={() => {
									setIsCompletedVisible(true);
									setDeleteInfo(order);
								}}
							/>
							<Badge
								value="Cancel"
								status="error"
								badgeStyle={{
									borderRadius: 10,
									height: 35,
									width: 100,
								}}
								textStyle={{ fontSize: 16 }}
								onPress={() => {
									setIsVisible(true);
									setDeleteInfo(order);
								}}
							/>
						</View>
					</Card>
				))}
			</View>
			<CancelOrderModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={loading}
				cancelOrder={cancelOrder}
				order={deleteInfo}
			/>
			<CompleteOrderModal
				isVisible={isCompletedVisible}
				setIsVisible={setIsCompletedVisible}
				loading={loading}
				changeStatus={cancelOrder}
				order={deleteInfo}
			/>
		</>
	);
};

export default NewOrderCard;

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		width: "90%",
		alignSelf: "center",
		marginBottom: 20,
		gap: 20,
	},
	headingContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	headingText: {
		fontSize: 18,
		fontWeight: "bold",
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
		justifyContent: "space-around",
	},
});
