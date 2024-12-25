import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../FavoritesContext';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { favorites, removeFromFavorites } = useFavorites();

  const renderHeader = () => (     <View style={styles.header}>       <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Go back">         <Icon name="arrow-left" size={24} color="white" />       </TouchableOpacity>       <Text style={styles.headerTitle}>My Favorites</Text>       <View style={{ width: 24 }} />     </View>   );

  const handleCustomizePress = (item) => {
    const foodItem = {
      title: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
    };
    navigation.navigate('FoodDetail', { foodItem });
  };

  const renderItem = ({ item }) => {
    if (!item || typeof item !== 'object') {
      console.error("Invalid item:", item);
      return null;
    }
    return (
      <View style={styles.productItem}>
        <Image
          source={{ uri: item.image || 'https://via.placeholder.com/80' }}
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name || 'Unnamed Item'}</Text>
          <Text style={styles.productDisc}>{item.description || 'Delicious Food Item'}</Text>
          <Text style={styles.productPrice}>
            Rs. {item.price?.toString() || '0'}
          </Text>
          <TouchableOpacity
            style={styles.customizeButton}
            onPress={() => handleCustomizePress(item)}
          >
            <Text style={styles.customizeButtonText}>Customize</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromFavorites(item)}
        >
          <Icon name="trash-2" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  
  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="heart" size={50} color="red" />
      <Text style={styles.emptyStateText}>No favorites added yet</Text>
      <Text style={styles.emptyStateSubText}>Items you favorite will appear here</Text>
      <TouchableOpacity 
        style={styles.exploreButton}
        onPress={() => navigation.navigate('ViewAll')}
      >
        <Text style={styles.exploreButtonText}>Explore Menu </Text>
      </TouchableOpacity>
      
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {favorites.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item, index) => (item?.name || index.toString())}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1C1C1C',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDisc:{
    fontSize: 16,
    color: '#CCCCCC',
  },
  listContent: {
    padding: 16,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  customizeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  customizeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyStateText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubText: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
   exploreButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});