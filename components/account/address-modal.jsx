import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheet, ListItem } from "@rneui/themed";

const AddressModal = ({ isVisible, setIsVisible, address }) => {
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
							My Address
						</ListItem.Title>
					</ListItem.Content>
				</ListItem>
				<ListItem>
					<ListItem.Content>
						<ListItem.Title style={{ fontSize: 18 }}>
							{address}
						</ListItem.Title>
					</ListItem.Content>
				</ListItem>
			</BottomSheet>
		</SafeAreaProvider>
	);
};

export default AddressModal;
