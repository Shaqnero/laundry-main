import "react-native-gesture-handler";
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
