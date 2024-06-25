import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MultiSelect } from "react-native-element-dropdown";
import { FontAwesome } from "@expo/vector-icons";

const data = [
	{ label: "Washing", value: "washing" },
	{ label: "Ironing", value: "ironing" },
	{ label: "Dry Cleaning", value: "dry_ironing" },
	{ label: "Carpet Cleaning", value: "carpet_cleaning" },
];

const OrderType = ({ orderType, setOrderType }) => {
	return (
		<View style={styles.mainContainer}>
			<Text style={styles.cardHeader}>Service Type</Text>
			<View style={styles.container}>
				<MultiSelect
					style={styles.dropdown}
					placeholderStyle={styles.placeholderStyle}
					selectedTextStyle={styles.selectedTextStyle}
					inputSearchStyle={styles.inputSearchStyle}
					iconStyle={styles.iconStyle}
					search
					data={data}
					labelField="label"
					valueField="value"
					placeholder="Select item"
					searchPlaceholder="Search..."
					value={orderType}
					onChange={(item) => {
						setOrderType(item);
					}}
					renderLeftIcon={() => (
						<FontAwesome
							style={styles.icon}
							name="reorder"
							size={20}
							color="black"
						/>
					)}
					selectedStyle={styles.selectedStyle}
				/>
			</View>
		</View>
	);
};

export default OrderType;

const styles = StyleSheet.create({
	mainContainer: {
		width: "90%",
		alignSelf: "center",
		marginTop: 20,
	},
	cardHeader: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 6,
	},
	container: { padding: 16 },
	dropdown: {
		height: 50,
		backgroundColor: "transparent",
		borderBottomColor: "gray",
		borderBottomWidth: 0.5,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 14,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	icon: {
		marginRight: 5,
	},
	selectedStyle: {
		borderRadius: 12,
	},
});
