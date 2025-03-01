// import { Redirect } from "expo-router";
// import { useAuth } from "./context/AuthContext";

// console.log("🚀 Rendering app/index.tsx");

// export default function Index() {
//   const { loggedInUser, loading } = useAuth();
//   console.log("🔍 Auth state:", { loggedInUser, loading });

//   if (loading) {
//     console.log("⏳ Waiting for auth state...");
//     return null;
//   }

//   console.log(loggedInUser ? "✅ User logged in, redirecting to /tabs" : "🚪 User not logged in, redirecting to /auth/welcome");
//   return loggedInUser ? <Redirect href="/tabs" /> : <Redirect href="/auth/welcome" />;
// }

// import { Redirect } from "expo-router";
// import { useAuth } from "./context/AuthContext";

// console.log("🚀 Rendering app/index.tsx");

// export default function Index() {
//   const { loggedInUser, loading } = useAuth();
//   console.log("🔍 Auth state:", { loggedInUser, loading });

//   if (loading) {
//     console.log("⏳ Waiting for auth state...");
//     return null;
//   }

//   console.log(loggedInUser ? "✅ User logged in, redirecting to /tabs" : "🚪 User not logged in, redirecting to /auth/welcome");
//   return loggedInUser ? <Redirect href="/tabs" /> : <Redirect href="/auth/welcome" />;
// }

import { Redirect } from "expo-router";
import { useAuth } from "./context/AuthContext";

console.log("🚀 Rendering app/index.tsx");

export default function Index() {
  const { loggedInUser, loading } = useAuth();
  console.log("🔍 Auth state:", { loggedInUser, loading });

  if (loading) {
    console.log("⏳ Waiting for auth state...");
    return null;
  }

  console.log(loggedInUser ? "✅ User logged in, redirecting to /tabs" : "🚪 User not logged in, redirecting to /auth/welcome");
  return loggedInUser ? <Redirect href="/tabs" /> : <Redirect href="/auth/welcome" />;
}
