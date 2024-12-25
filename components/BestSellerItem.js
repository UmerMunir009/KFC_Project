import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';

export default function BestSellerItem({ title, price, image, onPress }) {
  return (
    <TouchableOpacity style={styles.bestSellerItem} onPress={onPress}>
      <View style={styles.dotsContainer}>
        {[1, 2, 3].map((dot) => (
          <View key={dot} style={styles.dot} />
        ))}
      </View>
      <View style={styles.imageContainer}>
      <Image
        source={{ uri: image }}
        style={styles.menuItemImage}
        resizeMode="cover"
      />
      </View>
      <Text style={styles.menuItemTitle}>{title}</Text>
      {price && <Text style={styles.menuItemPrice}>Rs {price}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bestSellerItem: {
    width: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black transparent
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
  },
  menuItemImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginTop: 28, // Add top margin to push the image down
    marginBottom: 8,
    padding:25
  },
  menuItemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    borderBottomWidth: 2,
    borderBottomColor: '#E4002B',
    paddingBottom: 4,
  },
  menuItemPrice: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    gap: 4,
    marginBottom: 5, 
  },
  dot: {
    width: 15,
    height: 20,
    backgroundColor: '#E4002B',
    borderRadius: 1,
  },
  imageContainer:{
    padding:10,
  }
});

