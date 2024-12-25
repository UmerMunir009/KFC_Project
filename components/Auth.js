import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";

const { height } = Dimensions.get("window"); // Get screen height for responsive layout

// Auto-refresh session when app is active
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [splashIndex, setSplashIndex] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setSplashIndex(1);
    }, 1000);

    const timer2 = setTimeout(() => {
      setSplashIndex(2);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const renderSplashScreen = () => {
    const splashImage =
      splashIndex === 0
        ? require("../assets/splash1.jpg")
        : require("../assets/splash2.jpg");

    return (
      <View style={styles.splashContainer}>
        <Image
          source={splashImage}
          style={styles.splashImage}
          resizeMode="contain"
        />
      </View>
    );
  };

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  if (splashIndex < 2) {
    return renderSplashScreen();
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/Welcome.jpg")}
          h
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}></Text>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            style={styles.input}
            labelStyle={styles.label}
            placeholderTextColor="grey"
            label="Email"
            leftIcon={{ type: "font-awesome", name: "envelope", color: "red" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            style={styles.input}
            labelStyle={styles.label}
            placeholderTextColor="grey"
            label="Password"
            leftIcon={{ type: "font-awesome", name: "lock", color: "red" }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={() => signInWithEmail()}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.signupText}>
          Don't have an account already? Sign up
        </Text>
        <View style={styles.verticallySpaced}>
          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={() => signUpWithEmail()}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Keep background black for the entire screen
  },
  imageContainer: {
    height: "35%", // 35% of screen height
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    paddingTop: 70,
    borderRadius: 5,
  },
  image: {
    width: "110%",
    height: "150%",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "black",
    marginHorizontal: 30,
    marginBottom: 50,
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 40,

    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 45,
    fontWeight: "900",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  verticallySpaced: {
    paddingVertical: 6,
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    color: "red",
  },
  label: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    color: "white",
    marginVertical: 10,
    fontSize: 14,
  },
  splashContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  splashImage: {
    width: "100%",
    height: "100%",
  },
});
