import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthStack from "./navigation/AuthStack";
import UserStack from "./navigation/UserStack";
import OfficialStack from "./navigation/OfficialStack";

// const AppContent = () => {
//   const { loggedInUser } = useAuth();
//   return (
//     // <Text> hello </Text>
//     <NavigationContainer >
//       {loggedInUser ? <UserStack /> : <AuthStack />}
//     </NavigationContainer>
//   );
// };

const AppContent = () => {
  const { loggedInUser } = useAuth();
  return loggedInUser ? <UserStack /> : <AuthStack />; 
};



export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


