import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OfficialDashboard from "../(tabs)/dashboard"; // Gov Official Dashboard

const Stack = createNativeStackNavigator();

export default function OfficialStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OfficialDashboard" 
      component={OfficialDashboard} />
      options={{ headerShown: false }}
    </Stack.Navigator>
  );
}
