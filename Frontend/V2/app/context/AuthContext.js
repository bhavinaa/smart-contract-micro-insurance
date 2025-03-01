// import React from "react";

// const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [loggedInUser, setLoggedInUser] = React.useState(null);
//   const [loading, setLoading] = useState(true); // ✅ Add loading state

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(authentication, (user) => {
//       setLoggedInUser(user);
//       setLoading(false); // ✅ Ensure loading state is updated
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => React.useContext(AuthContext);

// export default AuthContext;

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { authentication } from "../config/firebaseConfig";
// import { onAuthStateChanged, User } from "firebase/auth";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("🔄 Checking Firebase auth state...");
//     const unsubscribe = onAuthStateChanged(authentication, (user) => {
//       console.log("✅ Firebase user state updated:", user);
//       setLoggedInUser(user);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from "react";
import { authentication } from "../config/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

// ✅ Create Auth Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔄 Checking Firebase auth state...");

    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      console.log("✅ Firebase user state updated:", user);
      setLoggedInUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Fix export
export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
