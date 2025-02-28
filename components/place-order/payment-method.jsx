import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome5 } from "@expo/vector-icons";

const data = [
	{ label: "Cash On Delivery", value: "cash_on_delivery" },
	{ label: "Mobile Money", value: "mobile_money" },
];

const PaymentMethod = ({ setPaymentMethod, paymentMethod }) => {
	const [isFocus, setIsFocus] = useState(false);

	return (
		<View style={styles.container}>
			<Text style={styles.cardHeader}>Payment Method</Text>
			<View>
				<Dropdown
					style={[
						styles.dropdown,
						isFocus && { borderColor: "blue" },
					]}
					placeholderStyle={styles.placeholderStyle}
					selectedTextStyle={styles.selectedTextStyle}
					inputSearchStyle={styles.inputSearchStyle}
					iconStyle={styles.iconStyle}
					data={data}
					search
					maxHeight={300}
					labelField="label"
					valueField="value"
					placeholder={!isFocus ? "Select Payment Method" : "..."}
					searchPlaceholder="Search..."
					value={paymentMethod}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
					onChange={(item) => {
						setPaymentMethod(item.value);
						setIsFocus(false);
					}}
					renderLeftIcon={() => (
						<FontAwesome5
							style={styles.icon}
							color={isFocus ? "blue" : "black"}
							name="money-check-alt"
							size={20}
						/>
					)}
				/>
			</View>
		</View>
	);
};

export default PaymentMethod;

const styles = StyleSheet.create({
	container: {
		width: "90%",
		alignSelf: "center",
		marginTop: 20,
	},
	cardHeader: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 6,
	},
	dropdown: {
		height: 50,
		borderColor: "gray",
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: "absolute",
		backgroundColor: "white",
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
