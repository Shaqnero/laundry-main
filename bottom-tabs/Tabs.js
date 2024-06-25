import { Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Account from "../screens/Account";
import HomeScreen from "../screens/Home";
import AllOrders from "../screens/All-Orders";
import PlansPricing from "../screens/PlansPricing";

// navigation prop comes when we wrap the component around stack.navigator
const Home = () => {
	const Tab = createBottomTabNavigator();

	const screenOptions = {
		tabBarShowLabel: false,
		headerShown: true,
		headerTitleAlign: "center",
		headerBackTitleVisible: false,
		tabBarStyle: {
			// position: "absolute",
			// bottom: 0,
			// right: 0,
			// left: 0,
			elevation: 0,
			height: 60,
			backgroundColor: "#FEE5F9",
		},
	};

	return (
		<Tab.Navigator screenOptions={screenOptions}>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Entypo
									name="home"
									size={24}
									color={
										focused ? "#2E7DE1" : "rgba(0,0,0,1)"
									}
								/>
								<Text
									style={{ fontSize: 12, color: "#16247d" }}
								>
									HOME
								</Text>
							</View>
						);
					},
				}}
				name="Home"
				component={HomeScreen}
			/>
			<Tab.Screen
				name="All Orders"
				component={AllOrders}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Entypo
									name="menu"
									size={24}
									color={
										focused ? "#2E7DE1" : "rgba(0,0,0,1)"
									}
								/>
								<Text
									style={{ fontSize: 12, color: "#16247d" }}
								>
									ALL ORDERS
								</Text>
							</View>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Plans and Pricing"
				component={PlansPricing}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Entypo
									name="price-tag"
									size={24}
									color={
										focused ? "#2E7DE1" : "rgba(0,0,0,1)"
									}
								/>
								<Text
									style={{ fontSize: 12, color: "#16247d" }}
								>
									PLANS
								</Text>
							</View>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Account"
				component={Account}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Ionicons
									name="person"
									size={24}
									color={
										focused ? "#2E7DE1" : "rgba(0,0,0,1)"
									}
								/>
								<Text
									style={{ fontSize: 12, color: "#16247d" }}
								>
									PROFILE
								</Text>
							</View>
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default Home;
