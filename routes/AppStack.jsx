import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "../bottom-tabs/Tabs";
import PlaceOrder from "../screens/Place-Order";
import ForgotPassword from "../screens/Forgot-Password";
import About from "../screens/About";
import AdminDashboard from "../screens/AdminDashboard";
import MyDrawer from "../bottom-tabs/Drawer";
import { useGlobalContext } from "../context/Context";
import OrderDetails from "../screens/OrderDetails";
import NewOrders from "../screens/NewOrders";
import OrderHistory from "../screens/OrderHistory";

const Stack = createNativeStackNavigator();

const AppStack = () => {
	const { isAdmin } = useGlobalContext();
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: "center",
				headerBackTitleVisible: false,
			}}
		>
			<Stack.Screen
				name="Home Screen"
				options={{ headerShown: false }}
				component={isAdmin ? MyDrawer : Tabs}
			/>
			<Stack.Screen
				name="Place Order"
				options={{ headerShown: true }}
				component={PlaceOrder}
			/>
			<Stack.Screen
				name="Forgot Password"
				options={{ headerShown: true }}
				component={ForgotPassword}
			/>
			<Stack.Screen
				name="About Us"
				options={{ headerShown: true, headerTitleAlign: "left" }}
				component={About}
			/>
			<Stack.Screen
				name="Order Details"
				options={{ headerShown: true, headerTitleAlign: "left" }}
				component={OrderDetails}
			/>
			<Stack.Screen
				name="Active Orders"
				options={{ headerShown: true, headerTitleAlign: "left" }}
				component={NewOrders}
			/>
			<Stack.Screen
				name="Order History"
				options={{ headerShown: true, headerTitleAlign: "left" }}
				component={OrderHistory}
			/>
		</Stack.Navigator>
	);
};

export default AppStack;
