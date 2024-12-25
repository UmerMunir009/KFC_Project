import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";

import Avatar from "./Avatar";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, phone_number, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setPhoneNumber(data.phone_number);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    phone_number,
    avatar_url,
  }: {
    username: string;
    phone_number: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        phone_number,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.screenBackground}>
      <View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Avatar
            size={150}
            url={avatarUrl}
            onUpload={(url: string) => {
              setAvatarUrl(url);
              updateProfile({
                username,
                phone_number: phoneNumber,
                avatar_url: url,
              });
            }}
          />
        </View>

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            style={styles.input}
            labelStyle={styles.labelStyle}
            placeholderTextColor="#e9e6e6"
            label="Email"
            value={session?.user?.email}
            disabled
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            style={styles.input}
            labelStyle={styles.labelStyle}
            placeholderTextColor="#e9e6e6"
            label="Username"
            value={username || ""}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            style={styles.input}
            labelStyle={styles.labelStyle}
            placeholderTextColor="#e9e6e6"
            label="Phone Number"
            value={phoneNumber || ""}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              updateProfile({
                username,
                phone_number: phoneNumber,
                avatar_url: avatarUrl,
              })
            }
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Loading ..." : "Confirm"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.verticallySpaced}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => supabase.auth.signOut()}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: "#000000", // Black background for the entire screen
    flex: 1,
    padding: 30,
    marginBottom: 0,
    paddingTop: 60,
  },
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    color: "white",
    backgroundColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  labelStyle: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
  },
});
