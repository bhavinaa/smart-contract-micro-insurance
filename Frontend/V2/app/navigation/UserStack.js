import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../(tabs)/dashboard"; // Farmer Dashboard
import ProfileScreen from "../(tabs)/profile";
// import TabLayout from "../(tabs)/_layout";


const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" 
      component={DashboardScreen}
      options = {{ headerShown: true}}
       />
      <Stack.Screen 
      name="Dashboard" 
      component={DashboardScreen}
      options = {{ headerShown: true}} 
      />
      <Stack.Screen 
      name="Profile" 
      component={ProfileScreen}
      options = {{ headerShown: true}} 
      />
    </Stack.Navigator>
  );
}