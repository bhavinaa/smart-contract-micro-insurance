import { useRouter } from "expo-router";
import { View, Text, Button } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    await login(); // Simulate login (replace with Firebase Auth)
    router.push("/tabs/home"); // Redirect after login
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
