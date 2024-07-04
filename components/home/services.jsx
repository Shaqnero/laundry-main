import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

const Services = () => {
	return (
		<View style={styles.servicesContainer}>
			<Text style={styles.heading}> Services</Text>
			<ScrollView style={{ marginTop: 10, gap: 10 }} horizontal>
				<View style={styles.service}>
					<Image
						style={styles.img}
						source={require("../../assets/machine.png")}
					/>
					<Text style={styles.serviceText}>Washing</Text>
				</View>
				<View style={styles.service}>
					<Image
						style={styles.img}
						source={require("../../assets/iron.png")}
					/>
					<Text style={styles.serviceText}>Ironing</Text>
				</View>
				<View style={styles.service}>
					<Icon name="dry-cleaning" size={40} />
					<Text style={styles.serviceText}>Dry Cleaning</Text>
				</View>
				<View style={styles.service}>
					<Image
						style={styles.img}
						source={require("../../assets/carpet.png")}
					/>
					<Text style={styles.serviceText}>Carpet Cleaning</Text>
				</View>
			</ScrollView>
		</View>
	);
};

export default Services;

const styles = StyleSheet.create({
	servicesContainer: {
		marginTop: 20,
		width: "90%",
		alignSelf: "center",
	},
	heading: {
		fontSize: 18,
		fontWeight: "bold",
	},
	service: {
		margin: 8,
		width: 120,
		height: 120,
		backgroundColor: "#FEE5F9",
		padding: 12,
		justifyContent: "center",
		alignContent: "center",
		gap: 12,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,

		elevation: 3,
	},
	serviceText: {
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
	},
	img: {
		alignSelf: "center",
	},
});
