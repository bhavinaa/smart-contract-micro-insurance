// import { Redirect } from "expo-router";
// import { useAuth } from "./context/AuthContext";

// export default function Index() {
//   const { loggedInUser } = useAuth();

//   if (!loggedInUser) {
//     return <Redirect href="/auth/login" />;
//   }

//   return <Redirect href="/tabs/home" />;
// }
import { View, Text } from "react-native";

export default function DebugScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>🚀 Expo Router Works!</Text>
    </View>
  );
}
