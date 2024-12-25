import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DealCard from './DealCard';
import dealItems from '../data/dealItems.json';

export default function TopDeals({ handleBestSellerPress }) {
  const renderDealItem = ({ item }) => (
    <DealCard
      key={item.id}
      item={item}
      onPress={() => handleBestSellerPress(item)}
    />
  );

  return (
    <View style={styles.section}>
      <View style={styles.titleContainer}>
        <Text style={[styles.text, styles.underlinedText]}>To</Text>
        <Text style={styles.text}>p Deals</Text>
      </View>
      <FlatList
        data={dealItems}
        keyExtractor={(item) => item.id}
        renderItem={renderDealItem} 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 20,
  },
  text: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  underlinedText: {
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
});

