import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
      <Text style={{ fontSize: 20 }}>🚀 This is a Modal!</Text>
      <Button title="Close" onPress={() => router.back()} />
    </View>
  );
}
