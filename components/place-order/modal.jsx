import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheet, Button, ListItem } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const PlaceOrderModal = ({ isVisible, setIsVisible }) => {
	return (
		<SafeAreaProvider>
			<BottomSheet
				modalProps={{}}
				isVisible={isVisible}
				onBackdropPress={() => setIsVisible(false)}
			>
				<ListItem>
					<ListItem.Content style={styles.content}>
						<AntDesign
							name="checkcircle"
							size={50}
							color="#66F663"
						/>
						<ListItem.Title>Successfully Accepted</ListItem.Title>
						<Button
							title={"Done"}
							buttonStyle={{
								backgroundColor: "#66F663",
								paddingRight: 40,
								paddingLeft: 40,
								borderRadius: 10,
							}}
							titleStyle={{ color: "black" }}
							onPress={() => setIsVisible(false)}
						/>
					</ListItem.Content>
				</ListItem>
			</BottomSheet>
		</SafeAreaProvider>
	);
};

export default PlaceOrderModal;

const styles = StyleSheet.create({
	content: {
		alignItems: "center",
		paddingBottom: 20,
		paddingTop: 20,
		gap: 60,
	},
});
