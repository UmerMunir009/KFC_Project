import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ProductItem from './ProductItem';

export default function ProductRow({ products, handleAddToBucket, handleCustomizePress, handleFavoritePress, favorites }) {
  const renderItem = ({ item }) => (
    <ProductItem
      item={item}
      handleAddToBucket={() => handleAddToBucket(item)}
      handleCustomizePress={handleCustomizePress}
      handleFavoritePress={handleFavoritePress}
      isFavorite={favorites.some((fav) => fav.name === item.name)}
    />
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.productRow}
    />
  );
}

const styles = StyleSheet.create({
  productRow: {
    paddingHorizontal: 16,
    marginBottom: 17,
    gap:18
  },
});