import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { supabase, getSession } from "./lib/supabase"; // Import Supabase config
import Auth from "./components/Auth";
import Account from "./components/Account";
import AppNavigator from "./Navigation/AppNavigator";
import { LogBox } from "react-native";

const App = () => {
  const [session, setSession] = useState(null);
  const [showHome, setShowHome] = useState(false);
  const [showAccount, setShowAccount] = useState(true);

  LogBox.ignoreAllLogs();

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session || null);
      if (session) {
        setShowAccount(true);
        setShowHome(false);
      }
    });
  }, []);

  const handleNavigateToHome = () => {
    setShowHome(true);
    setShowAccount(false);
  };

  if (session && showHome) {
    return <AppNavigator />;
  }

  if (session && showAccount) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Account key={session.user.id} session={session} />

        <TouchableOpacity style={styles.button} onPress={handleNavigateToHome}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <Auth />;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;
