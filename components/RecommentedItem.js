import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';



const RecommendedItem = ({ item, onAddToBucket }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>Rs. {item.price}</Text>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => onAddToBucket(item)}
      >
        <Text style={styles.buttonText}>ADD TO BUCKET</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#e31837',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default RecommendedItem;

