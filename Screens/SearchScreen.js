import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import categories from '../data/searchData.json';
import { useBucket } from '../BucketContext';
import DraggableBucket from '../components/draggable-bucket';
import { useFavorites } from '../FavoritesContext';
import ProductItem from '../components/ProductItem';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const { addToBucket, bucketItems } = useBucket();
  const { favorites } = useFavorites();

  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Added to Bucket',
      visibilityTime: 2000,
      autoHide: true,

      topOffset: 100,
    });
  };
  const toastConfig = {
    success: ({ text1, props }) => (
      <View
        style={[
          styles.toastContainer,
          { backgroundColor: props.backgroundColor || 'red' },
        ]}>
        <Text style={styles.toastText1}>{text1}</Text>
      </View>
    ),
  };

  const handleAddToBucket = (item) => {
    const bucketItem = {
      id: `${item.id}_${Date.now()}`, // Add a unique identifier
      title: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      quantity: 1,
      totalPrice: item.price,
    };

    addToBucket(bucketItem);
    showToast();
  };

  const handleCustomizePress = useCallback(
    (item) => {
      const foodItem = {
        title: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        addOns:item.addOns
      };
      navigation.navigate('FoodDetail', { foodItem });
    },
    [navigation]
  );

  const getFilteredProducts = useCallback(() => {
    if (!searchQuery.trim()) return categories.categories[0].data;

    return categories.categories[0].data.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <Icon name="map-pin" size={16} color="white" />
            <Text style={styles.locationText}>No Address Selected</Text>
          </View>
        </View>
        <Image
          source={{
            uri: 'data:image/png;base64,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',
          }}
          style={styles.logo}
        />
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search delicious menu"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}>
            <Icon name="x" size={20} color="gray" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );

  const renderProductItem = useCallback(
    ({ item }) => (
      <ProductItem
        item={item}
        handleAddToBucket={handleAddToBucket}
        handleCustomizePress={handleCustomizePress}
      />
    ),
    [handleAddToBucket, handleCustomizePress]
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="light-content" />
        {renderHeader()}
        <FlatList
          data={getFilteredProducts()}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.name}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.listContent}
        />

        <Toast config={toastConfig} />
        {bucketItems?.length > 0 && (
          <TouchableOpacity
            style={styles.viewBucketContainer}
            onPress={() => navigation.navigate('Bucket')}
            activeOpacity={0}>

            <View style={styles.bucketLeft}>
              <Image
                source={{ uri: bucketItems[bucketItems.length - 1]?.image }}
                style={styles.bucketItemImage}
              />
              <Text style={styles.viewBucketText}>
                {`${bucketItems?.length} ${
                  bucketItems?.length === 1 ? 'item' : 'items'
                }`}
              </Text>
            </View>

            <View style={styles.bucketRight}>
              <Text style={styles.viewBucketText}>
                Rs{' '}
                {bucketItems?.reduce((sum, item) => sum + item.totalPrice, 0) ||
                  0}
              </Text>
              <Text style={styles.viewBucketButtonText}>View Bucket </Text>
            </View>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    padding: 16,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
  toastContainer: {
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginHorizontal: 9,
  },
  toastText1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  locationText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
    flex: 1,
  },
  logo: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    padding: 8,
  },
  clearButton: {
    padding: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  productRow: {
    justifyContent: 'space-between',
  },

  viewBucketContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4D0009',
    padding: 10,
  },
  bucketLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
  },
  bucketItemImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  viewBucketText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  bucketRight: {
    padding: 10,
    width: '70%',
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    borderRadius: 7,
  },
  viewBucketButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 16,
    fontWeight: 'bold',
  },

  productItem: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    width: (width - 48) / 2,
    marginBottom: 16,
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
    paddingHorizontal: 6,
    marginLeft: 7,
  },
  addButtonText: {
    color: 'white',
    fontSize: 10,
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
  imageContainerforPadding: {
    padding: 15,
  },
});
