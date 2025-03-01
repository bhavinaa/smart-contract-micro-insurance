// import { Stack } from "expo-router";
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import LoginScreen from "./LoginScreen";
// import WelcomeScreen from "./WelcomeScreen";
// import SignUpScreen from "./SignUpScreen";

// import { authentication } from "../config/firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useAuth } from "../context/AuthContext";

// export default function AuthLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="LoginScreen" />
//       <Stack.Screen name="signup" />
//     </Stack>
//   );
// }

import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}

