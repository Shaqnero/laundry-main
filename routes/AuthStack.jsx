import Signup from "../screens/Signup";
import Login from "../screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ForgotPassword from "../screens/Forgot-Password";
import AdminLogin from "../screens/AdminLogin";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: "center",
				headerBackTitleVisible: false,
			}}
		>
			<Stack.Screen name="Signup" component={Signup} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Forgot Password" component={ForgotPassword} />
			<Stack.Screen name="Admin" component={AdminLogin} />
		</Stack.Navigator>
	);
};

export default AuthStack;
