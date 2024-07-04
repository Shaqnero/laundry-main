import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Button, Card } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AboutBottomSheet from "../components/about/bottom-sheet";
import ContactModal from "../components/account/contact-modal";

const About = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isContactOpen, setIsContactOpen] = useState(false);

	return (
		<>
			<View style={styles.container}>
				<Card containerStyle={styles.card}>
					<Image
						source={require("../assets/about.png")}
						resizeMode="contain"
						style={styles.img}
					/>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-around",
							marginTop: 10,
						}}
					>
						<TouchableOpacity
							style={{
								flexDirection: "column",
								backgroundColor: "transparent",
							}}
							titleStyle={{ color: "black" }}
							onPress={() => setIsContactOpen(true)}
						>
							<Ionicons
								name="call-outline"
								size={35}
								color="#0E25F9"
							/>
							<Text>Call</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								flexDirection: "column",
								backgroundColor: "transparent",
							}}
							titleStyle={{ color: "black" }}
							onPress={() => setIsVisible(true)}
						>
							<Entypo
								name="direction"
								size={35}
								color="#0E25F9"
							/>
							<Text>Direction</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								flexDirection: "column",
								backgroundColor: "transparent",
							}}
							titleStyle={{ color: "black" }}
						>
							<AntDesign
								name="sharealt"
								size={35}
								color="#0E25F9"
							/>
							<Text>Share</Text>
						</TouchableOpacity>
					</View>
					<Text
						style={{
							marginTop: 20,
							padding: 10,
							fontSize: 16,
							textAlign: "justify",
						}}
					>
						Imagine a world where laundry day is no longer a chore,
						but a seamless and delightful experience. Welcome to the
						Laundry Service App, your portal to laundry convenience
						redefined.
					</Text>
					<View style={{ marginTop: 10, gap: 4, padding: 10 }}>
						<Text style={{ fontWeight: "bold" }}>Addresses</Text>
						<Text>PO Box SP 203, Spintex road, Tema</Text>
					</View>
					<View style={{ marginTop: 10, gap: 4, padding: 10 }}>
						<Text style={{ fontWeight: "bold" }}>
							Opening Hours
						</Text>
						<Text>Monday - Saturday</Text>
						<Text>8:00AM - 6:00PM</Text>
					</View>
				</Card>
			</View>
			<AboutBottomSheet
				isVisible={isVisible}
				setIsVisible={setIsVisible}
			/>
			<ContactModal
				isVisible={isContactOpen}
				setIsVisible={setIsContactOpen}
			/>
		</>
	);
};

export default About;

const styles = StyleSheet.create({
	img: {
		width: "100%",
		height: 230,
		objectFit: "cover",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	container: {
		marginTop: 0,
		width: "90%",
		alignSelf: "center",
		marginBottom: 20,
	},
	card: {
		backgroundColor: "#FEE5F9",
		width: "100%",
		alignSelf: "center",
		marginTop: 0,
		borderRadius: 10,
		padding: 0,
	},
});
