import {
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	Pressable,
	Platform,
} from "react-native";
import React, { useMemo, useState } from "react";
import FirebaseService from "../context/service";
import Toast from "react-native-root-toast";

//context API
import { useGlobalContext } from "../context/Context";
import { useForm, Controller } from "react-hook-form";
import { Button, Icon, Input } from "@rneui/themed";

const AdminLogin = ({ navigation }) => {
	const firebaseService = useMemo(() => new FirebaseService());
	const { setIsAdmin } = useGlobalContext();

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		control,
	} = useForm();

	const handleLogin = async (values) => {
		const { email, password } = values;

		if (email !== "admin@gmail.com") {
			Toast.show("Invalid Email\n Please Provide an admin email", {
				duration: Toast.durations.LONG,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
				backgroundColor: "red",
				textColor: "white",
			});
			return;
		}

		try {
			const user = await firebaseService.logIn(email, password);
			Toast.show("Login Successfull\nWelcome to Quick Clean", {
				duration: Toast.durations.LONG,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
			});
			setIsAdmin(true);
		} catch (error) {
			console.error("Signup failed:", error.message);
			Toast.show(`Error: ${error.message.replace("Firebase: ", "")}`, {
				duration: Toast.durations.LONG,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
				backgroundColor: "red",
				textColor: "white",
			});
		}
	};
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
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

				{/* Password */}
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							placeholder="Password"
							placeholderTextColor={"#AEAEAE"}
							leftIcon={
								<Icon
									name="eye-slash"
									type="font-awesome"
									size={22}
									containerStyle={{
										padding: 4,
										paddingTop: 8,
									}}
									color="black"
								/>
							}
							{...register("password", {
								required: "Password field is required",
							})}
							style={styles.input}
							onChangeText={(value) => onChange(value)}
							value={value}
							secureTextEntry
							inputContainerStyle={styles.inputContainer}
							errorMessage={
								errors?.password?.message
									? errors?.password?.message
									: null
							}
						/>
					)}
					name="password"
					rules={{
						required: "Password field is required",
						minLength: {
							value: 6,
							message:
								"Password field must be at least 6 characters",
						},
					}}
				/>

				<Pressable
					onPress={() => navigation.navigate("Forgot Password")}
					style={styles.forgotPassword}
				>
					<Text style={styles.noAccountLabel}>
						Forgot password?{"  "}
						<Text style={styles.signUpLabel}>Reset</Text>
					</Text>
				</Pressable>

				{/* Login button */}

				<Button
					onPress={handleSubmit(handleLogin)}
					size="sm"
					type="solid"
					color={"#F9C3FD"}
					containerStyle={{
						alignSelf: "center",
						width: "90%",
						marginTop: 20,
					}}
					buttonStyle={{
						padding: 10,
					}}
					loading={isSubmitting}
					titleStyle={{ color: "black" }}
				>
					Login
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
};

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

export default AdminLogin;
