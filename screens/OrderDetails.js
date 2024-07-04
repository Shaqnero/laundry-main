import { StyleSheet, Text, View } from "react-native";
import React from "react";
import VirtualizedView from "../components/virtualized-view/virtualized-view";
import { useFetchOrder, useFetchUser } from "../hooks/useFetchData";
import { services, status, status_color } from "../library";
import { useGlobalContext } from "../context/Context";

const OrderDetails = ({ route }) => {
	const { id } = route.params;
	const { data, loading } = useFetchOrder(id);
	const { user: UserInfo } = useGlobalContext();
	const { data: user, loading: isLoadingUser } = useFetchUser(UserInfo?.uid);

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
				Loading...
			</Text>
		);
	}

	return (
		<View style={styles.container}>
			<VirtualizedView>
				<View style={styles.main}>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<View style={{ padding: 10, flex: 0.5 }}>
							<Text style={{ fontSize: 18 }}>Order ID</Text>
						</View>
						<View
							style={{
								padding: 10,
								backgroundColor: "#fff",
								flex: 1,
							}}
						>
							<Text style={{ fontSize: 16, fontWeight: "bold" }}>
								{data?.orderId}
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<View style={{ padding: 10, flex: 0.5 }}>
							<Text style={{ fontSize: 18 }}>Customer</Text>
						</View>
						<View
							style={{
								padding: 10,
								backgroundColor: "#fff",
								flex: 1,
							}}
						>
							<Text style={{ fontSize: 16, fontWeight: "bold" }}>
								{data?.name}
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<View style={{ padding: 10, flex: 0.5 }}>
							<Text style={{ fontSize: 18 }}>Email</Text>
						</View>
						<View
							style={{
								padding: 10,
								backgroundColor: "#fff",
								flex: 1,
							}}
						>
							<Text style={{ fontSize: 16, fontWeight: "bold" }}>
								{data?.email}
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<View style={{ padding: 10, flex: 0.5 }}>
							<Text style={{ fontSize: 18 }}>Service</Text>
						</View>
						<View
							style={{
								padding: 10,
								backgroundColor: "#fff",
								flex: 1,
							}}
						>
							{data?.service?.map((service, index) => {
								return (
									<Text
										style={{
											fontSize: 16,
											fontWeight: "bold",
										}}
										key={index}
									>
										{services[service]}
									</Text>
								);
							})}
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<View style={{ padding: 10, flex: 0.5 }}>
							<Text style={{ fontSize: 18 }}>Status</Text>
						</View>
						<View
							style={{
								padding: 10,
								backgroundColor: "#fff",
								flex: 1,
							}}
						>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "bold",
									color: status_color[data?.status],
								}}
							>
								{status[data?.status]}
							</Text>
						</View>
					</View>
					{data?.plan && (
						<View
							style={{
								flexDirection: "row",
								marginTop: 40,
							}}
						>
							<View style={{ padding: 10, flex: 0.5 }}>
								<Text style={{ fontSize: 18 }}>
									Current Plan
								</Text>
							</View>
							<View
								style={{
									padding: 10,
									backgroundColor: "#fff",
									flex: 1,
								}}
							>
								<Text
									style={{ fontSize: 16, fontWeight: "bold" }}
								>
									{user?.plan}
								</Text>
							</View>
						</View>
					)}

					<View
						style={{
							flexDirection: "row",
						}}
					>
						<View style={{ padding: 10, flex: 0.5 }}>
							<Text style={{ fontSize: 18 }}>Phone</Text>
						</View>
						<View
							style={{
								padding: 10,
								backgroundColor: "#fff",
								flex: 1,
							}}
						>
							<Text style={{ fontSize: 16, fontWeight: "bold" }}>
								{data?.phone}
							</Text>
						</View>
					</View>
					<View style={{ marginTop: 40 }}>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 20,
								marginBottom: 5,
							}}
						>
							Pickup Details
						</Text>
						<View
							style={{
								flexDirection: "row",
								backgroundColor: "#D9D9D9",
							}}
						>
							<View style={{ padding: 10, flex: 0.5 }}>
								<Text style={{ fontSize: 18 }}>
									Pickup Address
								</Text>
							</View>
							<View
								style={{
									padding: 10,
									backgroundColor: "#fff",
									flex: 1,
								}}
							>
								<Text
									style={{ fontSize: 16, fontWeight: "bold" }}
								>
									{data?.location}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</VirtualizedView>
		</View>
	);
};

export default OrderDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#D9D9D9",
		gap: 20,
	},
	main: {
		width: "95%",
		alignSelf: "center",
		marginTop: 10,
	},
});
