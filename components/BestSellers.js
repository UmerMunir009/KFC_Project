import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BestSellerItem from './BestSellerItem';
import bestSellerItems from '../data/bestSellers.json';

export default function BestSellers({ handleBestSellerPress }) {
  return (
    <View style={styles.section}>
      <View style={styles.titleContainer}>
        <Text style={[styles.text, styles.underlinedText]}>Bes</Text>
        <Text style={styles.text}>t Sellers</Text>
      </View>
      <FlatList
        horizontal
        data={bestSellerItems}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
        renderItem={({ item }) => (
          <BestSellerItem
            title={item.title}
            price={item.price}
            image={item.image}
            onPress={() => handleBestSellerPress(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 20,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  text: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  underlinedText: {
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
});

