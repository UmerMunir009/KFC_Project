import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';

export default function DealCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.dealCard} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.dealImage} />
      <View style={styles.dealInfo}>
        <Text style={styles.dealTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.dealDescription} numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Text>
        <View style={styles.whiteLine} />
        <View style={styles.priceAndButtonContainer}>
          <Text style={styles.dealPrice}>Rs {item.price}</Text>
          <TouchableOpacity style={styles.viewButton} onPress={onPress}>
            <Text style={styles.viewButtonText}>VIEW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dealCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
   borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    width: 350,
    height: 130,
    padding:10
  },
  dealImage: {
    width: '30%',
    height: '100%',
    resizeMode: 'cover',
  },
  dealInfo: {
    width: '70%',
    padding: 10,
    justifyContent: 'space-between',
  },
  dealTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dealDescription: {
    color: 'white',
    fontSize: 12,
    marginBottom: 4,
  },
  whiteLine: {
    height: 1,
    backgroundColor: 'white',
    marginVertical: 4,
  },
  priceAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dealPrice: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: '#E4002B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

