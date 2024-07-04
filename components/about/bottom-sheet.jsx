import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheet, ListItem } from "@rneui/themed";

const AboutBottomSheet = ({ isVisible, setIsVisible }) => {
	const list = [
		{ title: "List Item 1" },
		{ title: "List Item 2" },
		{
			title: "Cancel",
			containerStyle: { backgroundColor: "red" },
			titleStyle: { color: "white" },
			onPress: () => setIsVisible(false),
		},
	];
	return (
		<SafeAreaProvider>
			<BottomSheet modalProps={{}} isVisible={isVisible}>
				<ListItem containerStyle={styles.containerStyle}>
					<ListItem.Content>
						<ListItem.Title style={styles.titleStyle}>
							East Legon
						</ListItem.Title>
					</ListItem.Content>
				</ListItem>
				<ListItem
					containerStyle={{ backgroundColor: "red" }}
					onPress={() => setIsVisible(false)}
				>
					<ListItem.Content>
						<ListItem.Title style={{ color: "white" }}>
							CLOSE
						</ListItem.Title>
					</ListItem.Content>
				</ListItem>
			</BottomSheet>
		</SafeAreaProvider>
	);
};

export default AboutBottomSheet;

const styles = StyleSheet.create({
	// containerStyle: { backgroundColor: "red" },
	titleStyle: { color: "black" },
});
