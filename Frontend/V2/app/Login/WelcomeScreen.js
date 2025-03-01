import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";




// const WelcomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcomeText}>Welcome to Our App!</Text>
//       <Text style={styles.subtitle}>Choose your role to continue:</Text>

//       {/* Farmer Button */}
//       <TouchableOpacity 
//         style={styles.button} 
//         onPress={() => navigation.navigate("SignUp", { role: "Farmer" })}
//       >
//         <Text style={styles.buttonText}>I am a Farmer</Text>
//       </TouchableOpacity>

//       {/* Official Button */}
//       <TouchableOpacity 
//         style={styles.button} 
//         onPress={() => navigation.navigate("SignUp", { role: "Official" })}
//       >
//         <Text style={styles.buttonText}>I am an Official</Text>
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
//     padding: 20,
//     backgroundColor: "#f8f9fa",
//   },
//   welcomeText: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 16,
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 18,
//     color: "#555",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#2563eb",
//     borderRadius: 25,
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     marginVertical: 10,
//     width: "80%",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
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

// export default WelcomeScreen;

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Firebase : )</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    width: "90%",
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WelcomeScreen;
