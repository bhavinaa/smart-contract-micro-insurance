// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { authentication, db } from "../config/firebaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, doc, setDoc } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";

// const SignUpScreen = ({ route, navigation }) => {
//   const { role } = route.params; // ✅ Get the selected role (Farmer or Official)

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [name, setName] = useState("");
//   const [location, setLocation] = useState(""); // Common field for both roles
//   const [farmName, setFarmName] = useState(""); // Only for Farmers
//   const [organization, setOrganization] = useState(""); // Only for Officials

//   const [isLoading, setIsLoading] = useState(false);
//   const { setLoggedInUser } = useAuth();

//   const handleSignUp = async () => {
//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const res = await createUserWithEmailAndPassword(authentication, email, password);
//       const user = res.user;

//       // ✅ Save user details in Firestore
//       const userRef = doc(collection(db, "users"), user.uid);
//       await setDoc(userRef, {
//         uid: user.uid,
//         email: email,
//         role: role,
//         name: name,
//         location: location,
//         ...(role === "Farmer" ? { farmName: farmName } : { organization: organization }),
//       });

//       setLoggedInUser(user);
//       console.log("User registered successfully!");

//       // ✅ Navigate to login
//       navigation.navigate("Login");

//     } catch (error) {
//       console.error("Signup error:", error);
//       Alert.alert("Signup Error", error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign Up as a {role}</Text>

//       {/* Common Fields */}
//       <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />

//       {/* Role-Specific Fields */}
//       {role === "Farmer" && (
//         <TextInput style={styles.input} placeholder="Farm Name" value={farmName} onChangeText={setFarmName} />
//       )}
//       {role === "Official" && (
//         <TextInput style={styles.input} placeholder="Organization Name" value={organization} onChangeText={setOrganization} />
//       )}

//       {/* Password Fields */}
//       <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
//       <TextInput
//         style={styles.input}
//         placeholder="Confirm Password"
//         secureTextEntry
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//       />

//       {/* Sign Up Button */}
//       <TouchableOpacity onPress={handleSignUp} style={styles.button}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//         {isLoading && <ActivityIndicator size="small" color="white" style={{ paddingLeft: 10 }} />}
//       </TouchableOpacity>

//       {/* Already have an account? */}
//       <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//         <Text style={styles.loginText}>Already have an account? Log in</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 16,
//     paddingLeft: 8,
//   },
//   button: {
//     backgroundColor: "#007BFF",
//     width: "100%",
//     paddingVertical: 15,
//     borderRadius: 10,
//     marginTop: 10,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   loginText: {
//     marginTop: 20,
//     fontSize: 16,
//     color: "#2563eb",
//     textDecorationLine: "underline",
//   },
// });

// export default SignUpScreen;


import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { authentication } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { setLoggedInUser } = useAuth();

  const handleSignUp = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(authentication, email, password)
      .then((res) => {
        console.log(res.user);
        setLoggedInUser(res.user);
      })
      .catch((re) => {
        console.log(re);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{
              alignSelf: "center",
              justifyContent: "center",
              paddingLeft: 10,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SignUpScreen;