import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useFavorites } from '../FavoritesContext';

const { width } = Dimensions.get('window');

export default function ProductItem({
  item,
  handleAddToBucket,
  handleCustomizePress,
}) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.name === item.name);

  const handleFavoritePress = () => {
    if (isFavorite) {
      removeFromFavorites(item);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <View style={styles.productItem}>
      <View style={styles.productImageContainer}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}>
          <Icon
            name="heart"
            size={20}
            color={isFavorite ? 'red' : 'white'}
            fill={isFavorite ? 'red' : 'none'}
          />
        </TouchableOpacity>
        <View style={styles.imageConatinerforPadding}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <View style={styles.productFooter}>
        <Text style={styles.productPrice}>{`Rs ${item.price}`}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToBucket(item)}>
          <Text style={styles.addButtonText}>ADD TO BUCKET</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.customizeButton}
        onPress={() => handleCustomizePress(item)}>
        <Text style={styles.customizeButtonText}>CUSTOMIZE</Text>
        <Icon name="chevron-right" size={16} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  productItem: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    width: (width - 48) / 2,
    marginBottom: 13,
  },
  productImageContainer: {
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  productDescription: {
    color: 'gray',
    fontSize: 12,
    marginTop: 4,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  productPrice: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'red',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 1,
    marginLeft: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  customizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  customizeButtonText: {
    color: 'red',
    fontSize: 12,
    marginRight: 4,
  },
  imageConatinerforPadding: {
    padding: 15,
  },
});
