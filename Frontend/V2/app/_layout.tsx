// import { Redirect } from "expo-router";
// import { useAuth } from "./context/AuthContext";

// export default function Index() {
//   const { loggedInUser } = useAuth();

//   return loggedInUser ? <Redirect href="/tabs" /> : <Redirect href="/auth/welcome" />;
// }

// import { Slot, useRootNavigationState } from "expo-router";
// import { ActivityIndicator, View } from "react-native";

// console.log("🚀 Rendering app/_layout.tsx");

// export default function Layout() {
//   const navigationState = useRootNavigationState();
//   console.log("🔄 Navigation state:", navigationState);

//   if (!navigationState?.key) {
//     console.log("⏳ Waiting for navigation state...");
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }
//   console.log("✅ Navigation state ready, rendering <Slot />");
//   return <Slot />; 
// }

// import { Slot, useRootNavigationState } from "expo-router";
// import { ActivityIndicator, View } from "react-native";
// import AuthProvider from "./context/AuthContext"; // ✅ Ensure correct import

// console.log("🚀 Rendering app/_layout.tsx");

// export default function Layout() {
//   const navigationState = useRootNavigationState();
//   console.log("🔄 Navigation state:", navigationState);

//   if (!navigationState?.key) {
//     console.log("⏳ Waiting for navigation state...");
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   console.log("✅ Navigation state ready, rendering <Slot />");

//   return (
//     <AuthProvider>
//       <Slot />
//     </AuthProvider>
//   );
// }

import { Slot, useRootNavigationState } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import AuthProvider from "./context/AuthContext";

console.log("🚀 Rendering app/_layout.tsx");

export default function Layout() {
  const navigationState = useRootNavigationState();
  console.log("🔄 Navigation state:", navigationState);

  if (!navigationState?.key) {
    console.log("⏳ Waiting for navigation state...");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log("✅ Navigation state ready, rendering <Slot />");

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}




// // import { StatusBar } from 'expo-status-bar';
// // import { StyleSheet, Text, View, Button } from 'react-native';
// // import { NavigationContainer } from "@react-navigation/native";
// // import { AuthProvider, useAuth } from "./context/AuthContext";

// import { Slot, Redirect, useRootNavigationState } from "expo-router";
// import { useAuth } from "./context/AuthContext";
// import { ActivityIndicator, View } from "react-native";

// export default function Layout() {
//   const { loggedInUser } = useAuth();
//   const navigationState = useRootNavigationState();

//   if (!navigationState?.key) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!loggedInUser) {
//     return <Redirect href="/auth/welcome" />; 
//   }

//   return <Slot />; 
// }


// // const AppContent = () => {
// //   const { loggedInUser } = useAuth();
// //   return (
// //     // <Text> hello </Text>
// //     <NavigationContainer >
// //       {loggedInUser ? <UserStack /> : <AuthStack />}
// //     </NavigationContainer>
// //   );
// // };

// // const AppContent = () => {
// //   const { loggedInUser } = useAuth();
// //   return loggedInUser ? <UserStack /> : <AuthStack />; 
// // };

// // export default function App() {
// //   return (
// //     <AuthProvider>
// //       <AppContent />
// //     </AuthProvider>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });


