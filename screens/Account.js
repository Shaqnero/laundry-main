import { View, Text, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { Button, Card, BottomSheet, ListItem } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import FirebaseService from "../context/service";
import AddressModal from "../components/account/address-modal";
import ContactModal from "../components/account/contact-modal";
import { useGlobalContext } from "../context/Context";
import { useFetchUser } from "../hooks/useFetchData";

const Profile = ({ navigation }) => {
	const [isMyAddressVisible, setIsMyAddressVisible] = useState(false);
	const [isContactOpen, setIsContactOpen] = useState(false);
	const { user } = useGlobalContext();
	const firebaseService = useMemo(() => new FirebaseService());

	const handleLogout = async () => {
		firebaseService.logOut();
	};

	const { data, loading } = useFetchUser(user?.uid);

	return (
		<>
			<View style={styles.container}>
				<Card containerStyle={styles.card}>
					{loading ? (
						<Text
							style={{
								textAlign: "center",
								fontSize: 22,
								fontWeight: "bold",
								margin: 20,
							}}
						>
							Loading Profile...
						</Text>
					) : (
						<View style={{ flexDirection: "row", gap: 6 }}>
							<MaterialCommunityIcons
								name="account-circle"
								size={50}
								color="black"
							/>
							<View>
								<Text style={styles.name}>{data?.name}</Text>
								<Text style={{ color: "rgba(0,0,0,.6)" }}>
									{data?.email}
								</Text>
							</View>
						</View>
					)}
					<Card.Divider style={{ marginTop: 10 }} />
					<View style={styles.buttons}>
						<Button
							size="sm"
							icon={
								<Entypo
									name="location-pin"
									size={30}
									color="black"
									style={{ marginRight: 10 }}
								/>
							}
							type="clear"
							containerStyle={{
								width: "100%",
								alignItems: "flex-start",
							}}
							buttonStyle={{
								justifyContent: "flex-start",
								width: "100%",
							}}
							title={"My Address"}
							titleStyle={{ color: "#222", fontSize: 18 }}
							onPress={() => setIsMyAddressVisible(true)}
						/>
						<Button
							size="sm"
							icon={
								<Entypo
									name="info"
									size={30}
									color="black"
									style={{ marginRight: 10 }}
								/>
							}
							type="clear"
							containerStyle={{
								width: "100%",
								alignItems: "flex-start",
							}}
							buttonStyle={{
								justifyContent: "flex-start",
								width: "100%",
							}}
							title={"About Us"}
							titleStyle={styles.titleStyle}
							onPress={() => navigation.push("About Us")}
						/>
						<Button
							size="sm"
							icon={
								<AntDesign
									name="contacts"
									size={30}
									color="black"
									style={{ marginRight: 10 }}
								/>
							}
							type="clear"
							containerStyle={{
								width: "100%",
								alignItems: "flex-start",
							}}
							buttonStyle={{
								justifyContent: "flex-start",
								width: "100%",
							}}
							title={"Contact Us"}
							titleStyle={styles.titleStyle}
							onPress={() => setIsContactOpen(true)}
						/>
						<Button
							size="sm"
							icon={
								<Entypo
									name="key"
									size={30}
									color="black"
									style={{ marginRight: 10 }}
								/>
							}
							type="clear"
							containerStyle={{
								width: "100%",
								alignItems: "flex-start",
							}}
							buttonStyle={{
								justifyContent: "flex-start",
								width: "100%",
							}}
							title={"Change Password"}
							titleStyle={styles.titleStyle}
							onPress={() => navigation.push("Forgot Password")}
						/>
						<Button
							onPress={handleLogout}
							size="sm"
							icon={
								<Entypo
									name="log-out"
									size={30}
									color="rgba(199, 43, 12, 1)"
									style={{ marginRight: 10 }}
								/>
							}
							type="clear"
							containerStyle={{
								width: "100%",
								alignItems: "flex-start",
							}}
							buttonStyle={{
								justifyContent: "flex-start",
								width: "100%",
							}}
							title={"Log out"}
							titleStyle={styles.titleStyle}
						/>
					</View>
				</Card>
			</View>
			<AddressModal
				isVisible={isMyAddressVisible}
				setIsVisible={setIsMyAddressVisible}
				address={data?.location}
			/>
			<ContactModal
				isVisible={isContactOpen}
				setIsVisible={setIsContactOpen}
			/>
		</>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		marginTop: 0,
		width: "90%",
		alignSelf: "center",
		marginBottom: 20,
	},
	card: {
		backgroundColor: "#FEE5F9",
		width: "100%",
		alignSelf: "center",
		marginTop: 10,
		borderRadius: 10,
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
	},
	buttons: {
		marginTop: 10,
		gap: 12,
	},
	titleStyle: { color: "#222", fontSize: 18 },
});
