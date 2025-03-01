import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { authentication } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setLoggedInUser } = useAuth();
  const router = useRouter(); 

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const res = await signInWithEmailAndPassword(authentication, email, password);
      setLoggedInUser(res.user);
      router.replace("/tabs"); 
    } catch (err) {
      console.log(err);
      setError("Incorrect Email/Password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#003f5c"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#003f5c"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.loginText}>Login</Text>
        {isLoading && <ActivityIndicator size="small" color="white" style={{ paddingLeft: 10 }} />}
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <Text style={styles.downText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/auth/signup")}> {/* ✅ Changed to router.push() */}
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  input: { width: "100%", height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 16, paddingLeft: 8 },
  button: { backgroundColor: "#302298", borderRadius: 20, padding: 10, margin: 14, width: "78%", height: 50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
  loginText: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 16 },
  welcomeText: { fontSize: 24, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  downText: { color: "#331ece", fontSize: 16, fontWeight: "400", marginTop: 10 },
  signup: { alignSelf: "flex-start", textDecorationLine: "underline", color: "#331ece", fontSize: 16, fontWeight: "500", marginLeft: 5, marginTop: 10 },
});

// export default LoginScreen; (removed duplicate export)
