import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Button, Card } from "@rneui/themed";
import { useFetchUser } from "../hooks/useFetchData";
import { useGlobalContext } from "../context/Context";
import FirebaseService from "../context/service";
import Toast from "react-native-root-toast";
import ChangePlanModal from "../components/plans/modal";

const PlansPricing = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState();
	const { user } = useGlobalContext();
	const { data, loading } = useFetchUser(user?.uid);

	const firebaseService = useMemo(() => new FirebaseService(), []);

	const changePlan = async () => {
		setIsLoading(true);
		try {
			await firebaseService.changePlan(data?.id, selectedPlan);
			Toast.show("Plan Selected Successfully", {
				duration: Toast.durations.LONG,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
			});
		} catch (error) {
			console.log(error);
			Toast.show("Something went wrong", {
				duration: Toast.durations.LONG,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
				backgroundColor: "red",
				textColor: "white",
			});
		} finally {
			setIsLoading(false);
			setIsVisible(false);
		}
	};
	return (
		<>
			<View style={styles.container}>
				<ScrollView>
					<Card containerStyle={styles.card}>
						<View style={styles.headerContainer}>
							<Text style={styles.heading}>Pay as You Go</Text>
						</View>
						<View>
							<Image
								source={require("../assets/plan1.png")}
								style={styles.img}
							/>
							<Text
								style={{
									textAlign: "center",
									fontSize: 18,
									fontWeight: "bold",
									marginBottom: 10,
								}}
							>
								GHC 100/bag
							</Text>
							<View style={{ gap: 2 }}>
								<Text
									style={{
										textAlign: "center",
										color: "rgba(0,0,0,.4)",
										fontSize: 16,
									}}
								>
									Pay per Laundry bag
								</Text>
								<Text
									style={{
										textAlign: "center",
										color: "rgba(0,0,0,.4)",
										fontSize: 16,
									}}
								>
									40/linens
								</Text>
								<Text
									style={{
										textAlign: "center",
										color: "rgba(0,0,0,.4)",
										fontSize: 16,
									}}
								>
									20/delicates bag
								</Text>
							</View>
							<Card.Divider
								style={{ marginBottom: 10, marginTop: 10 }}
							/>
							<View
								style={[
									styles.plansFooter,
									{ marginBottom: 10 },
								]}
							>
								<Image
									source={require("../assets/check.png")}
								/>
								<Text
									style={{ fontSize: 14, fontWeight: "bold" }}
								>
									GHC 20 Pickup and Delivery Fee
								</Text>
							</View>
							<View style={styles.plansFooter}>
								<Image
									source={require("../assets/check.png")}
								/>
								<Text
									style={{ fontSize: 14, fontWeight: "bold" }}
								>
									Free Welcome Kit
								</Text>
							</View>
							<Button
								size="sm"
								type="solid"
								color={"#FF40B4"}
								containerStyle={styles.button}
								buttonStyle={{
									borderRadius: 6,
									paddingRight: 20,
									paddingLeft: 20,
								}}
								disabled={data?.plan === "pay_as_you_go"}
								disabledTitleStyle={{
									color: "rgba(0,0,0,0.8)",
								}}
								onPress={() => {
									setSelectedPlan("pay_as_you_go");
									setIsVisible(true);
								}}
							>
								{data?.plan === "pay_as_you_go"
									? "Current Plan"
									: "Get Started"}
							</Button>
						</View>
					</Card>
					<Card containerStyle={styles.card}>
						<View
							style={[
								styles.headerContainer,
								{ backgroundColor: "#0F1B48" },
							]}
						>
							<Text style={styles.heading}>Weeking</Text>
						</View>
						<View>
							<Image
								source={require("../assets/plan2.png")}
								style={styles.img}
							/>
							<Text
								style={{
									textAlign: "center",
									fontSize: 18,
									fontWeight: "bold",
									marginBottom: 10,
								}}
							>
								GHC 250/bag
							</Text>
							<View style={{ gap: 2 }}>
								<Text
									style={{
										textAlign: "center",
										color: "rgba(0,0,0,.4)",
										fontSize: 16,
									}}
								>
									4 Wash & Fold bags
								</Text>
								<Text
									style={{
										textAlign: "center",
										color: "rgba(0,0,0,.4)",
										fontSize: 16,
									}}
								>
									Billed monthly
								</Text>
								<Text
									style={{
										textAlign: "center",
										color: "rgba(0,0,0,.4)",
										fontSize: 16,
									}}
								>
									40/linen &20/delicates bag
								</Text>
							</View>
							<Card.Divider
								style={{ marginBottom: 10, marginTop: 10 }}
							/>
							<View
								style={[
									styles.plansFooter,
									{ marginBottom: 10 },
								]}
							>
								<Image
									source={require("../assets/check.png")}
								/>
								<Text style={{ fontSize: 14 }}>
									<Text style={{ fontWeight: "bold" }}>
										FREE
									</Text>{" "}
									Pickup & Delivery Fee
								</Text>
							</View>
							<View style={styles.plansFooter}>
								<Image
									source={require("../assets/check.png")}
								/>
								<Text
									style={{ fontSize: 14, fontWeight: "bold" }}
								>
									Free Welcome Kit
								</Text>
							</View>
							<Button
								size="sm"
								type="solid"
								color={"#FF40B4"}
								containerStyle={styles.button}
								buttonStyle={{
									borderRadius: 6,
									paddingRight: 20,
									paddingLeft: 20,
								}}
								disabled={data?.plan === "weeking"}
								disabledTitleStyle={{
									color: "rgba(0,0,0,0.8)",
								}}
								onPress={() => {
									setSelectedPlan("weeking");
									setIsVisible(true);
								}}
							>
								{data?.plan === "weeking"
									? "Current Plan"
									: "Get Started"}
							</Button>
						</View>
					</Card>
					<Card containerStyle={styles.card}>
						<View
							style={[
								styles.headerContainer,
								{ backgroundColor: "#2E7DE1" },
							]}
						>
							<Text style={styles.heading}>Weeking +</Text>
						</View>
						<View>
							<Image
								source={require("../assets/plan3.png")}
								style={styles.img}
							/>
							<Text
								style={{
									textAlign: "center",
									fontSize: 18,
									fontWeight: "bold",
									marginBottom: 10,
								}}
							>
								GHC 380/bag
							</Text>
							<View style={{ gap: 2 }}>
								<Text
									style={{
										textAlign: "center",
										color: "rgba(0,0,0,.4)",
										fontSize: 16,
									}}
								>
									4 Wash & Fold bags
								</Text>
								<Text
									style={{
										textAlign: "center",
										color: "rgba(0,0,0,.4)",
										fontSize: 16,
									}}
								>
									4 Linens bags/month
								</Text>
								<Text
									style={{
										textAlign: "center",
										color: "rgba(0,0,0,.4)",
										fontSize: 16,
									}}
								>
									Billed monthly
								</Text>
							</View>
							<Card.Divider
								style={{ marginBottom: 10, marginTop: 10 }}
							/>
							<View
								style={[
									styles.plansFooter,
									{ marginBottom: 10 },
								]}
							>
								<Image
									source={require("../assets/check.png")}
								/>
								<Text style={{ fontSize: 14 }}>
									<Text style={{ fontWeight: "bold" }}>
										FREE
									</Text>{" "}
									Pickup & Delivery Fee
								</Text>
							</View>
							<View style={styles.plansFooter}>
								<Image
									source={require("../assets/check.png")}
								/>
								<Text
									style={{ fontSize: 14, fontWeight: "bold" }}
								>
									Free Welcome Kit
								</Text>
							</View>
							<Button
								size="sm"
								type="solid"
								color={"#FF40B4"}
								containerStyle={styles.button}
								buttonStyle={{
									borderRadius: 6,
									paddingRight: 20,
									paddingLeft: 20,
								}}
								disabled={data?.plan === "weeking_plus"}
								disabledTitleStyle={{
									color: "rgba(0,0,0,0.8)",
								}}
								onPress={() => {
									setSelectedPlan("weeking_plus");
									setIsVisible(true);
								}}
							>
								{data?.plan === "weeking_plus"
									? "Current Plan"
									: "Get Started"}
							</Button>
						</View>
					</Card>
				</ScrollView>
			</View>
			<ChangePlanModal
				isLoading={isLoading}
				isVisible={isVisible}
				changePlan={changePlan}
				setIsVisible={setIsVisible}
				user={data}
			/>
		</>
	);
};

export default PlansPricing;

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		width: "75%",
		alignSelf: "center",
		marginBottom: 10,
	},
	heading: { fontSize: 18, fontWeight: "bold", color: "#fff" },
	headerContainer: {
		backgroundColor: "#FF40B4",
		padding: 8,
		borderTopRightRadius: 40,
	},
	card: {
		padding: 0,
		paddingBottom: 20,
		borderTopRightRadius: 40,
	},
	img: {
		alignSelf: "center",
	},
	plansFooter: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 8,
	},
	button: {
		alignSelf: "center",
		padding: 10,
		borderRadius: 20,
	},
});
