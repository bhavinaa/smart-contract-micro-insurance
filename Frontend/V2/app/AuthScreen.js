import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Logged in successfully!");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) return Alert.alert("Error", "Please enter your email");

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset link sent to your email!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? "Sign Up" : "Login"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.authButton} onPress={handleAuth}>
        <Text style={styles.authButtonText}>{isSignUp ? "Sign Up" : "Login"}</Text>
      </Pressable>

      {!isSignUp && (
        <Pressable onPress={handleResetPassword}>
          <Text style={styles.link}>Forgot Password?</Text>
        </Pressable>
      )}

      <Pressable onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.link}>
          {isSignUp ? "Already have an account? Login" : "New user? Sign Up"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1e293b",
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  authButton: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  authButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#2563eb",
    marginTop: 10,
    fontSize: 14,
  },
});
