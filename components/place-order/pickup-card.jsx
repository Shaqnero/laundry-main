import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Card } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const PickupCard = ({ setPickupDate, pickupDate }) => {
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setPickupDate(currentDate);
	};
	const time = pickupDate.toLocaleString().split(" ").splice(0);
	time.shift();

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
						Choose Pickup Date and Time
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
						{pickupDate.toLocaleString("en-US", {
							year: "numeric",
							month: "short",
							day: "numeric",
						})}
					</Text>
					<Text style={styles.dateTime}>{time.join(" ")}</Text>
				</View>
				{show && (
					<DateTimePicker
						testID="dateTimePicker"
						value={pickupDate}
						mode={mode}
						is24Hour={true}
						onChange={onChange}
					/>
				)}
			</Card>
		</View>
	);
};

export default PickupCard;

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		width: "90%",
		alignSelf: "center",
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
