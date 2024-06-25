import { createDrawerNavigator } from "@react-navigation/drawer";
import AdminDashboard from "../screens/AdminDashboard";
import OrderHistory from "../screens/OrderHistory";
import NewOrders from "../screens/NewOrders";

const Drawer = createDrawerNavigator();

function MyDrawer() {
	return (
		<Drawer.Navigator initialRouteName="Admin Dashboard">
			<Drawer.Screen name="Admin Dashboard" component={AdminDashboard} />
			<Drawer.Screen name="Order History" component={OrderHistory} />
			<Drawer.Screen name="Active Orders" component={NewOrders} />
		</Drawer.Navigator>
	);
}

export default MyDrawer;
