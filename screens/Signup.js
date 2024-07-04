import {
	KeyboardAvoidingView,
	ScrollView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import React, { useMemo } from "react";
import { useGlobalContext } from "../context/Context";
import FirebaseService from "../context/service";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-root-toast";

const Signup = ({ navigation }) => {
	const { setUser } = useGlobalContext();

	const firebaseService = useMemo(() => new FirebaseService());

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		control,
	} = useForm();

	const handleSignup = async (values) => {
		// console.log(values);
		const { email, password, location, name, phone } = values;
		try {
			const user = await firebaseService.signUp(email, password);
			if (user) {
				try {
					await firebaseService.addUserDetails({
						email,
						location,
						name,
						phone,
						uid: user?.uid,
						plan: "pay_as_you_go",
					});
				} catch (error) {
					console.error("Adding doc failed:", error.message);
				}
			}
			setUser(user);
			Toast.show("Signup Successfull\nWelcome to Quick Clean", {
				duration: Toast.durations.LONG,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
			});
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
			<ScrollView>
				<View style={styles.formContainer}>
					{/* <Image source={require("../assets/favicon.png")} /> */}
					<Text style={styles.appName}>Quick Clean</Text>

					{/* Name */}
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder="Full name"
								placeholderTextColor={"#AEAEAE"}
								leftIcon={
									<Icon
										name="person"
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
									errors?.name?.message
										? errors?.name?.message
										: null
								}
							/>
						)}
						name="name"
						rules={{ required: "Name field is required" }}
					/>

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

					{/* Number */}
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder="Phone Number"
								placeholderTextColor={"#AEAEAE"}
								keyboardType="numbers-and-punctuation"
								leftIcon={
									<Icon
										name="phone"
										size={22}
										containerStyle={{
											padding: 4,
											paddingTop: 8,
										}}
										color="black"
									/>
								}
								onChangeText={(value) => onChange(value)}
								value={value}
								style={styles.input}
								inputContainerStyle={styles.inputContainer}
								errorMessage={
									errors?.phone?.message
										? errors?.phone?.message
										: null
								}
							/>
						)}
						name="phone"
						rules={{ required: "Phone field is required" }}
					/>

					{/* Location */}
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder="Location"
								placeholderTextColor={"#AEAEAE"}
								leftIcon={
									<Icon
										name="location-pin"
										size={22}
										containerStyle={{
											padding: 4,
											paddingTop: 8,
										}}
										color="black"
									/>
								}
								onChangeText={(value) => onChange(value)}
								value={value}
								style={styles.input}
								inputContainerStyle={styles.inputContainer}
								errorMessage={
									errors?.location?.message
										? errors?.location?.message
										: null
								}
							/>
						)}
						name="location"
						rules={{ required: "Location field is required" }}
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

					{/* Signup button */}
					<Button
						onPress={handleSubmit(handleSignup)}
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
					>
						Sign Up
					</Button>

					{/* Login navigation */}
					<Pressable
						onPress={() => navigation.navigate("Login")}
						style={styles.loginContainer}
					>
						<Text style={styles.haveAccountLabel}>
							Already have an account?{"  "}
							<Text style={styles.loginLabel}>Login</Text>
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Signup;

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
		backgroundColor: "#fff",
		padding: 10,
		height: 40,
		alignSelf: "center",
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
	inputContainer: {
		borderColor: "#D921A5",
		borderBottomWidth: 1,
		marginHorizontal: 8,
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
		marginTop: 10,

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
	loginContainer: {
		marginTop: 120,
	},
	haveAccountLabel: {
		color: "#484848",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 15,
	},
	loginLabel: {
		color: "#1d9bf0",
	},
});
