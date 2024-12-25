import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import sliderImages from "../data/sliderImages.json";
export default function PromoSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % sliderImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.section}>
      <Text style={styles.text}>
        <Text style={[styles.underlinedText, styles.text]}>Wha</Text>
        <Text style={styles.text}>t's New</Text>
      </Text>
      <Image
        source={{ uri: sliderImages[currentImageIndex] }}
        style={styles.promoImage}
      />
      <TouchableOpacity style={styles.reorderButton}>
        <Text style={styles.reorderButtonText}>REORDER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 20,
  },

  promoImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    resizeMode: "contain",
  },
  reorderButton: {
    backgroundColor: "#E4002B",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  reorderButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  text: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  underlinedText: {
    borderBottomWidth: 1,
    borderBottomColor: "red",
  },
});
