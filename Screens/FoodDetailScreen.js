import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { ChevronLeft, Minus, Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useBucket } from '../BucketContext';
import Myalert from '../components/Alert';
import Toast from 'react-native-toast-message';

const HEADER_MAX_HEIGHT = 220;
const HEADER_MIN_HEIGHT = 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function FoodDetailScreen({ route }) {
  const { foodItem } = route.params;
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { addToBucket } = useBucket();
  const [alertVisible, setAlertVisible] = useState(false);

  const [regularDrinks, setRegularDrinks] = useState([]);
  const [largeDrinks, setLargeDrinks] = useState([]);
  const [selectedRegularDrinks, setSelectedRegularDrinks] = useState([]);
  const [selectedLargeDrinks, setSelectedLargeDrinks] = useState([]);
  const [addOns, setAddOns] = useState(foodItem.addOns || []);

  useEffect(() => {
    if (foodItem && foodItem.description) {
      const regularDrinkCount = (
        foodItem.description.match(/1 regular drink/g) || []
      ).length;
      const largeDrinkCount = (foodItem.description.match(/1\.5L drink/g) || [])
        .length;

      setRegularDrinks(Array(regularDrinkCount).fill(null));
      setLargeDrinks(Array(largeDrinkCount).fill(null));
      setSelectedRegularDrinks(Array(regularDrinkCount).fill(null));
      setSelectedLargeDrinks(Array(largeDrinkCount).fill(null));
    }
  }, [foodItem]);

  const [drinks, setDrinks] = useState([
    {
      id: 1,
      name: 'Pepsi Regular',
      price: 180,
      quantity: 0,
      image:
        'https://www.kfcpakistan.com/images/6249b820-0513-11ee-9e45-cb0ed000d4a6-pepsicopy-2023-06-07091210.png',
    },
    {
      id: 2,
      name: '7UP Regular',
      price: 180,
      quantity: 0,
      image:
        'https://www.kfcpakistan.com/images/62153aa0-0513-11ee-8eee-c7aabf77bad4-7up-2023-06-07091210.png',
    },
    {
      id: 3,
      name: 'Mirinda Regular',
      price: 180,
      quantity: 0,
      image:
        'https://www.kfcpakistan.com/images/61ea8120-0513-11ee-b037-a334837c64cb-Mirinda-2023-06-07091210.png',
    },
    {
      id: 4,
      name: 'Mountain Dew Regular',
      price: 180,
      quantity: 0,
      image:
        'https://www.kfcpakistan.com/images/62153aa0-0513-11ee-8eee-c7aabf77bad4-Dew-2023-06-07091210.png',
    },
  ]);

  const [largeDrinkOptions] = useState([
    {
      id: 1,
      name: 'Pepsi 1.5L',
      price: 340,
      quantity: 0,
      image:
        'https://www.kfcpakistan.com/images/6249b820-0513-11ee-9e45-cb0ed000d4a6-pepsicopy-2023-06-07091210.png',
    },
    {
      id: 2,
      name: '7UP 1.5L',
      price: 340,
      quantity: 0,
      image:
        'https://www.kfcpakistan.com/images/62153aa0-0513-11ee-8eee-c7aabf77bad4-7up-2023-06-07091210.png',
    },
    {
      id: 3,
      name: 'Mirinda 1.5L',
      price: 340,
      quantity: 0,
      image:
        'https://www.kfcpakistan.com/images/61ea8120-0513-11ee-b037-a334837c64cb-Mirinda-2023-06-07091210.png',
    },
    {
      id: 4,
      name: 'Mountain Dew 1.5L',
      price: 340,
      quantity: 0,
      image:
        'https://www.kfcpakistan.com/images/62153aa0-0513-11ee-8eee-c7aabf77bad4-Dew-2023-06-07091210.png',
    },
  ]);

  const handleAddToBucket = () => {
    if (
      selectedRegularDrinks.some((drink) => drink === null) ||
      selectedLargeDrinks.some((drink) => drink === null)
    ) {
      setAlertVisible(true);
      return;
    }

    const addedDrinks = [
      ...selectedRegularDrinks
        .filter(Boolean)
        .map((drink) => ({ ...drink, quantity: 1 })),
      ...selectedLargeDrinks
        .filter(Boolean)
        .map((drink) => ({ ...drink, quantity: 1 })),
      ...drinks.filter((drink) => drink.quantity > 0),
    ];

    const addedAddOns = addOns.filter((addon) => addon.quantity > 0);

    const drinkPrice = drinks.reduce(
      (sum, drink) => sum + drink.price * drink.quantity,
      0
    );
    const addOnPrice = addedAddOns.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const basePrice = foodItem.price * quantity;
    const itemTotalPrice = basePrice + drinkPrice + addOnPrice;

    const bucketItem = {
      id: `${foodItem.id}_${Date.now()}`,
      title: foodItem.title,
      description: foodItem.description,
      image: foodItem.image,
      price: itemTotalPrice / quantity,
      quantity: quantity,
      totalPrice: itemTotalPrice,
      addedItems: [...addedDrinks, ...addedAddOns],
      drinkPrice: drinkPrice,
      addOnPrice: addOnPrice,
    };

    addToBucket(bucketItem);
    showToast();
  };

  const handleItemQuantity = useCallback((id, change, itemType) => {
    if (itemType === 'drink') {
      setDrinks((prevDrinks) =>
        prevDrinks.map((drink) =>
          drink.id === id
            ? { ...drink, quantity: Math.max(0, drink.quantity + change) }
            : drink
        )
      );
    } else if (itemType === 'addOn') {
      setAddOns((prevAddOns) =>
        prevAddOns.map((addOn) =>
          addOn.id === id
            ? {
                ...addOn,
                quantity: Math.max(0, (addOn.quantity || 0) + change),
              }
            : addOn
        )
      );
    }
  }, []);

  const handleDrinkSelection = useCallback((drink, index, type) => {
    if (type === 'regular') {
      setSelectedRegularDrinks((prev) => {
        const newSelection = [...prev];
        newSelection[index] = drink;
        return newSelection;
      });
    } else if (type === 'large') {
      setSelectedLargeDrinks((prev) => {
        const newSelection = [...prev];
        newSelection[index] = drink;
        return newSelection;
      });
    }
  }, []);

  const totalPrice = React.useMemo(() => {
    return (
      (foodItem?.price || 0) * quantity +
      drinks.reduce((sum, drink) => sum + drink.price * drink.quantity, 0) +
      addOns.reduce(
        (sum, addOn) => sum + addOn.price * (addOn.quantity || 0),
        0
      )
    );
  }, [foodItem?.price, quantity, drinks, addOns]);

  const renderItems = useCallback(
    (items, itemType) =>
      items.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Rs {item.price}</Text>
          </View>
          {!item.quantity || item.quantity === 0 ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleItemQuantity(item.id, 1, itemType)}>
              <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => handleItemQuantity(item.id, -1, itemType)}>
                <Minus color="white" size={20} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => handleItemQuantity(item.id, 1, itemType)}>
                <Plus color="white" size={20} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )),
    [handleItemQuantity]
  );

  const renderDrinkOptions = useCallback(
    (drinkOptions, selectedDrinks, type, index) => {
      return drinkOptions.map((drink) => (
        <TouchableOpacity
          key={drink.id}
          style={[
            styles.itemContainer,
            selectedDrinks[index]?.id === drink.id && styles.selectedItem,
          ]}
          onPress={() => handleDrinkSelection(drink, index, type)}>
          <Image source={{ uri: drink.image }} style={styles.itemImage} />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemName}>{drink.name}</Text>
            <Text style={styles.itemPrice}>Rs: 0</Text>
          </View>
          <View
            style={[
              styles.radioButton2,
              selectedDrinks[index]?.id === drink.id &&
                styles.radioButtonSelected,
            ]}
          />
        </TouchableOpacity>
      ));
    },
    [handleDrinkSelection]
  );

  const renderContent = useCallback(
    () => (
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
          }
        )}
        style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>{foodItem?.title || 'Food Item'}</Text>
          <View style={styles.indicatorContainer}></View>
          <Text style={styles.description}>
            {foodItem?.description || 'Delicious and mouthwatering food item.'}
          </Text>

          <View style={styles.optionContainer}>
            <Text style={styles.optionTitle}>Choose an option</Text>
            <Text style={styles.optionRequired}>Required</Text>
          </View>

          <TouchableOpacity style={styles.itemContainer}>
            <Image source={{ uri: foodItem?.image }} style={styles.itemImage} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemName}>{foodItem?.title}</Text>
              <Text style={styles.itemPrice}>Rs {foodItem?.price}</Text>
            </View>
            <View style={styles.radioButton} />
          </TouchableOpacity>

          {regularDrinks.map((_, index) => (
            <View key={`regular-drink-${index}`}>
              <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>
                  Regular Drink {index + 1}
                </Text>
                <Text style={styles.optionRequired}>Required</Text>
              </View>
              {renderDrinkOptions(
                drinks,
                selectedRegularDrinks,
                'regular',
                index
              )}
            </View>
          ))}

          {largeDrinks.map((_, index) => (
            <View key={`large-drink-${index}`}>
              <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>1.5L Drink {index + 1}</Text>
                <Text style={styles.optionRequired}>Required</Text>
              </View>
              {renderDrinkOptions(
                largeDrinkOptions,
                selectedLargeDrinks,
                'large',
                index
              )}
            </View>
          ))}

          <View style={styles.optionContainer}>
            <Text style={styles.optionTitle}>Optional Drinks</Text>
            <Text style={styles.optionOptional}>Optional</Text>
          </View>
          {renderItems(drinks, 'drink')}

          {addOns.length > 0 && (
            <>
              <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>Add Ons</Text>
                <Text style={styles.optionOptional}>Optional</Text>
              </View>
              {renderItems(addOns, 'addOn')}
            </>
          )}
        </View>
      </ScrollView>
    ),
    [
      foodItem,
      renderItems,
      drinks,
      largeDrinkOptions,
      addOns,
      regularDrinks,
      largeDrinks,
      scrollY,
      selectedRegularDrinks,
      selectedLargeDrinks,
    ]
  );

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0, HEADER_SCROLL_DISTANCE],
    outputRange: [1.2, 1, 0.8],
    extrapolate: 'clamp',
  });

  const titleMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [10, 20],
    extrapolate: 'clamp',
  });

  const renderHeader = useCallback(
    () => (
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>

        <Animated.Image
          source={{ uri: foodItem?.image }}
          style={[
            styles.burgerImage,
            {
              transform: [{ scale: imageScale }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.titleContainer,
            { marginTop: titleMarginTop },
          ]}></Animated.View>
      </Animated.View>
    ),
    [navigation, headerHeight, imageScale, titleMarginTop, foodItem?.image]
  );

  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Item Added to cart',
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderHeader()}
      {renderContent()}
      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}>
            <Minus color="white" size={24} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity((prev) => prev + 1)}>
            <Plus color="white" size={24} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addToBucketButton}
          onPress={handleAddToBucket}>
          <Text style={styles.addToBucketText}>Rs {totalPrice}</Text>
          <Text style={styles.addToBucketText}>ADD TO BUCKET</Text>
        </TouchableOpacity>

        <Toast config={toastConfig} />
        <Myalert
          visible={alertVisible}
          title="Required Selection !!!"
          message="Please select all required drinks before adding to bucket."
          onClose={() => setAlertVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    marginTop: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  burgerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    marginVertical: 20,
    textAlign: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    zIndex: 1,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  optionRequired: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  optionOptional: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  selectedItem: {
    borderColor: '#FF0000',
    borderWidth: 2,
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  itemPrice: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    backgroundColor: 'red',
  },
  radioButton2: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
  },
  radioButtonSelected: {
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
  },
  addButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 5,
    padding: 5,
  },
  quantityText: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1C1C1C',
  },
  addToBucketButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 10,
  },
  addToBucketText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toastContainer: {
    padding: 6,
    paddingHorizontal: 5,
    borderRadius: 6,
    marginHorizontal: 9,
  },
  toastText1: {
    fontSize: 14,
    color: 'white',
    marginBottom: 4,
  },
  noAddOnsText: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
