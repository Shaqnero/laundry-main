import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Card } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const DeliveryCard = ({ deliveryDate, setDeliveryDate }) => {
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setDeliveryDate(currentDate);
	};
	const time = deliveryDate.toLocaleString().split(" ").splice(0);
	time.shift();

	const showMode = (currentMode) => {
		DateTimePickerAndroid.open({
			value: deliveryDate,
			onChange,
			mode: currentMode,
			is24Hour: true,
		});
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const showTimepicker = () => {
		showMode("time");
	};

	return (
		<View style={styles.container}>
			<Card containerStyle={styles.card}>
				<View style={styles.headingContainer}>
					<Text style={styles.cardHeader}>
						Choose Delivery Date and Time
					</Text>
				</View>
				<Card.Divider />
				<View style={styles.orderBody}>
					<View style={{ flexDirection: "row", gap: 8 }}>
						<FontAwesome name="car" size={34} color="black" />
						<View style={{ flexDirection: "row" }}>
							<Button
								size="sm"
								type="clear"
								onPress={showDatepicker}
							>
								Choose Date
							</Button>
							<Button
								size="sm"
								type="clear"
								onPress={showTimepicker}
							>
								Choose Time
							</Button>
						</View>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						gap: 8,
						justifyContent: "center",
					}}
				>
					<Text style={styles.dateTime}>
						{deliveryDate.toLocaleString("en-US", {
							year: "numeric",
							month: "short",
							day: "numeric",
						})}
					</Text>
					<Text style={styles.dateTime}>{time.join(" ")}</Text>
				</View>
			</Card>
		</View>
	);
};

export default DeliveryCard;

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
		marginBottom: 6,
	},
	orderBody: {
		flexDirection: "row",
		gap: 10,
		justifyContent: "space-between",
	},
	dateTime: {
		fontWeight: "700",
		textAlign: "center",
	},
});
