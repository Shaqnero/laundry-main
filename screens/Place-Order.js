import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useMemo, useState } from "react";
import PickupCard from "../components/place-order/pickup-card";
import PaymentMethod from "../components/place-order/payment-method";
import { Button, Input } from "@rneui/themed";
import Toast from "react-native-root-toast";
import PlaceOrderModal from "../components/place-order/modal";
import VirtualizedView from "../components/virtualized-view/virtualized-view";
import OrderType from "../components/place-order/order-type";
import { useFetchAllUsers, useFetchUser } from "../hooks/useFetchData";
import FirebaseService from "../context/service";
import { useGlobalContext } from "../context/Context";
import { generateRandomDigits } from "../library/utility";
import NoteInput from "../components/place-order/input";

const PlaceOrder = () => {
	const [note, setNote] = useState("");
	const [pickupDate, setPickupDate] = useState(new Date(1598051730000));
	const [paymentMethod, setPaymentMethod] = useState("");
	const [orderType, setOrderType] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const firebaseService = useMemo(() => new FirebaseService(), []);
	const { user } = useGlobalContext();

	const { data } = useFetchUser(user?.uid);
	// Example usage
	const randomDigits = generateRandomDigits();

	const handleMakeOrder = async () => {
		if (!pickupDate || !paymentMethod || orderType.length === 0) {
			Toast.show("Error\nYou cant submit an empty field", {
				duration: Toast.durations.LONG,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
				backgroundColor: "red",
				textColor: "white",
			});
			return;
		}
		setIsLoading(true);
		try {
			await firebaseService.addOrder({
				email: data?.email,
				location: data?.location,
				name: data?.name,
				phone: data?.phone,
				uid: data.uid,
				service: orderType,
				payment_method: paymentMethod,
				pickup_date: pickupDate.toISOString(),
				notes: note,
				status: "pending",
				orderId: randomDigits,
			});
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
		setIsVisible(true);
		setNote("");
		setPaymentMethod("");
		setOrderType([]);
	};

	return (
		<VirtualizedView>
			<OrderType orderType={orderType} setOrderType={setOrderType} />
			<View>
				<PickupCard
					setPickupDate={setPickupDate}
					pickupDate={pickupDate}
				/>
				<View style={styles.container}>
					<Text style={styles.cardHeader}>
						Pickup - Delivery Notes(Optional)
					</Text>
					<NoteInput note={note} setNote={setNote} />
				</View>
				<PaymentMethod
					setPaymentMethod={setPaymentMethod}
					paymentMethod={paymentMethod}
				/>
				<Button
					size="sm"
					type="solid"
					color={"#FF40B4"}
					containerStyle={styles.button}
					buttonStyle={{
						borderRadius: 6,
						paddingTop: 10,
						paddingBottom: 10,
					}}
					onPress={handleMakeOrder}
				>
					Make Order
				</Button>
			</View>
			<PlaceOrderModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
			/>
		</VirtualizedView>
	);
};

export default PlaceOrder;

const styles = StyleSheet.create({
	container: {
		width: "90%",
		alignSelf: "center",
		marginTop: 40,
	},
	cardHeader: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 6,
	},
	textInput: {
		borderWidth: 1,
		borderColor: "black",
		borderStyle: "solid",
		padding: 10,
		borderRadius: 14,
	},
	button: {
		padding: 10,
		borderRadius: 20,
		marginTop: 20,
		width: "95%",
		alignSelf: "center",
	},
});
