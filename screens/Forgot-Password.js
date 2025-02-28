import React, { useMemo } from "react";
import {
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	ScrollView,
	Pressable,
	Platform,
	Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Input, Icon, Button } from "@rneui/themed";
import FirebaseService from "../context/service";
import Toast from "react-native-root-toast";

function ForgotPassword({ navigation }) {
	const firebaseService = useMemo(() => new FirebaseService());

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		control,
	} = useForm();

	const handleResetPassword = async (values) => {
		const { email } = values;
		try {
			await firebaseService.resetPassword(email);
			// Alert.alert(
			// 	"Link to reset password has been sent",
			// 	"Please check your email to reset",
			// 	[{ text: "OK", onPress: () => navigation.goBack() }]
			// );
			Toast.show("Link to reset password has been sent", {
				duration: Toast.durations.LONG,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
			});
			navigation.goBack();
			// Do something with the user, e.g., update state or navigate to another screen
		} catch (error) {
			console.error("Signup failed:", error.message);
			Toast.show(`Error: ${error.message.replace("Firebase: ", "")}`, {
				duration: Toast.durations.LONG,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
			});
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<ScrollView>
			<View style={styles.formContainer}>
				<Text style={styles.appName}>Quick Clean</Text>

				{/* Email */}
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							placeholder="Email"
							placeholderTextColor={"#AEAEAE"}
							keyboardType="email-address"
							leftIcon={
								<Icon
									name="email"
									size={22}
									containerStyle={{
										padding: 4,
										paddingTop: 8,
									}}
									color="black"
								/>
							}
							style={styles.input}
							inputContainerStyle={styles.inputContainer}
							onChangeText={(value) => onChange(value)}
							value={value}
							errorMessage={
								errors?.email?.message
									? errors?.email?.message
									: null
							}
						/>
					)}
					name="email"
					rules={{
						required: "Email field is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Provide a valid email address",
						},
					}}
				/>

				{/* Login button */}
				{/* <Pressable
					style={[styles.btn, { marginTop: 20 }]}
					>
					<Text style={styles.btnText}>Reset</Text>
				</Pressable> */}
				<Button
					size="sm"
					type="solid"
					color={"#F9C3FD"}
					containerStyle={{
						alignSelf: "center",
						width: "90%",
					}}
					buttonStyle={{
						padding: 10,
					}}
					loading={isSubmitting}
					titleStyle={{ color: "black" }}
					onPress={handleSubmit(handleResetPassword)}
				>
					Reset
				</Button>
			</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	formContainer: {
		justifyContent: "center",
		alignContent: "center",
		height: "100%",
	},
	appName: {
		color: "#D921A5",
		fontSize: 40,
		fontWeight: "bold",
		alignSelf: "center",
		marginBottom: 20,
	},
	input: {
		padding: 10,
		height: 40,
		alignSelf: "center",
		borderRadius: 5,

		width: "80%",
		color: "#000000",

		marginTop: 10,
		// shadowColor: "#000",
		// shadowOffset: {
		// 	width: 0,
		// 	height: 2,
		// },
		// shadowOpacity: 0.23,
		// shadowRadius: 2.62,

		// elevation: 1,
	},
	errorText: {
		color: "red",
		alignSelf: "center",
		marginTop: 10,
	},
	btn: {
		backgroundColor: "#F9C3FD",
		padding: 10,
		height: 45,

		alignSelf: "center",
		borderRadius: 5,
		width: "80%",
		marginTop: 20,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,

		elevation: 3,
	},
	btnText: {
		color: "#484848",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 18,
	},
	signUpContainer: {
		marginTop: 80,
	},
	noAccountLabel: {
		color: "#484848",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 15,
	},

	signUpLabel: {
		color: "#1d9bf0",
	},
	inputContainer: {
		borderColor: "#D921A5",
		borderBottomWidth: 1,
		marginHorizontal: 8,
	},
});

export default ForgotPassword;
