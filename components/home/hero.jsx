import { Button } from "@rneui/themed";
import React from "react";
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	Pressable,
} from "react-native";

function Hero({ navigation }) {
	return (
		<View style={styles.welcomeContainer}>
			<ImageBackground
				source={require("../../assets/hero.png")}
				resizeMode="contain"
				style={styles.img}
			>
				<Text style={styles.message}>Place your order here</Text>
				<Text style={styles.submessage}>For pickups & deliveries</Text>
				<Button
					title={"PLACE ORDER"}
					containerStyle={{
						marginTop: 20,
						width: "40%",
						borderRadius: 20,
						marginLeft: 10,
						borderWidth: 1,
					}}
					buttonStyle={{ backgroundColor: "#fff" }}
					titleStyle={{ color: "black" }}
					onPress={() => navigation.push("Place Order")}
				/>
			</ImageBackground>
		</View>
	);
}

export default Hero;

const styles = StyleSheet.create({
	welcomeContainer: {
		padding: 12,
		backgroundColor: "#FEB4FF",
	},
	message: {
		fontSize: 26,
		fontWeight: "bold",
		marginTop: 60,
		padding: 10,
	},
	submessage: {
		fontSize: 18,
		fontWeight: "400",
		marginTop: 2,
		paddingLeft: 10,
	},
	userDetails: {
		fontSize: 20,
		color: "#FFFFFF",
	},
	img: {
		width: "100%",
		height: 270,
		objectFit: "cover",
	},
	btn: {
		backgroundColor: "#Fff",
		padding: 5,
		height: 30,
		borderRadius: 20,
		width: "35%",
		marginTop: 20,
		marginLeft: 10,
		borderWidth: 1,
	},
	btnText: {
		color: "#484848",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 18,
	},
});
