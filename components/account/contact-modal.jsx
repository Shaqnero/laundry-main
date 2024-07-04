import { View, Text, Linking } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheet, ListItem } from "@rneui/themed";

const ContactModal = ({ isVisible, setIsVisible }) => {
	return (
		<SafeAreaProvider>
			<BottomSheet
				modalProps={{}}
				isVisible={isVisible}
				onBackdropPress={() => setIsVisible(false)}
			>
				<ListItem>
					<ListItem.Content>
						<ListItem.Title style={{ fontWeight: "bold" }}>
							Contact Us
						</ListItem.Title>
					</ListItem.Content>
				</ListItem>
				<ListItem onPress={() => Linking.openURL("tel:+233555543385")}>
					<ListItem.Content>
						<ListItem.Title style={{ fontSize: 18 }}>
							+233 555543385
						</ListItem.Title>
					</ListItem.Content>
				</ListItem>
				<ListItem>
					<ListItem.Content>
						<ListItem.Title style={{ fontSize: 18 }}>
							quickclean@gmail.com
						</ListItem.Title>
					</ListItem.Content>
				</ListItem>
			</BottomSheet>
		</SafeAreaProvider>
	);
};

export default ContactModal;
