import { Slot, Redirect } from "expo-router";
import { AuthProvider, useAuth } from "./context/AuthContext";

const AppContent = () => {
  const { loggedInUser } = useAuth();

  if (!loggedInUser) {
    return <Redirect href="/auth/login" />; // Redirect to login if not authenticated
  }

  return <Slot />; // Loads the current route inside `app/`
};

export default function Layout() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
