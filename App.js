import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Router from "./routes/Router";
import { AppProvider } from "./context/Context";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
	return (
		<RootSiblingParent>
			<AppProvider>
				<Router />
			</AppProvider>
		</RootSiblingParent>
	);
}
