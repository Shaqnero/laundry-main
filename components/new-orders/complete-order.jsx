import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheet, Button, ListItem } from "@rneui/themed";
import { View } from "react-native";

const CompleteOrderModal = ({
	isVisible,
	setIsVisible,
	loading,
	changeStatus,
	order,
}) => {
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
							Do you want to mark this order as completed?
						</ListItem.Title>
					</ListItem.Content>
				</ListItem>
				<ListItem>
					<ListItem.Content>
						<View style={{ gap: 8, flexDirection: "row" }}>
							<Button
								size="sm"
								type="solid"
								color={"transparent"}
								containerStyle={{
									alignSelf: "center",
									borderRadius: 10,
									borderWidth: 1,
								}}
								titleStyle={{ color: "black" }}
								onPress={() => setIsVisible(false)}
							>
								Go Back
							</Button>
							<Button
								size="sm"
								type="solid"
								color={"success"}
								containerStyle={{
									alignSelf: "center",
									borderRadius: 10,
								}}
								loading={loading}
								onPress={() => {
									changeStatus(order?.id, "completed");
								}}
							>
								Confirm
							</Button>
						</View>
					</ListItem.Content>
				</ListItem>
			</BottomSheet>
		</SafeAreaProvider>
	);
};

export default CompleteOrderModal;
