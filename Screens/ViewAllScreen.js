import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  SectionList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useBucket } from "../BucketContext";
import Icon from "react-native-vector-icons/Feather";
import { useFavorites } from "../FavoritesContext";
import DeliveryOptions from "../components/DeliveryOptions";
import CategoryList from "../components/CategoryList";
import ProductRow from "../components/ProductRow";
import SectionHeader from "../components/SectionHeader";
import categoriesData from "../data/categories.json";
import Toast from "react-native-toast-message";

export default function ViewAllScreen() {
  const [activeCategory, setActiveCategory] = useState(
    categoriesData.categories[0].title
  );
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const sectionListRef = useRef(null);
  const categoryScrollViewRef = useRef(null);
  const navigation = useNavigation();
  const { addToBucket, bucketItems } = useBucket();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.locationContainer}>
          <Icon name="map-pin" size={16} color="white" />
          <Text style={styles.locationText}>No Address Selected</Text>
        </View>
      </View>
      <Image
        source={{
          uri: "data:image/png;base64,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",
        }}
        style={styles.logo}
      />

      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleSearchPress()}
        >
          <Icon name="search" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const showToast = () => {
    Toast.show({
      type: "success",
      position: "top",
      text1: "Item Added to cart",
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
          { backgroundColor: props.backgroundColor || "red" },
        ]}
      >
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

  const handleSearchPress = () => {
    navigation.navigate("SearchScreen");
  };

  const handleCustomizePress = (item) => {
    const foodItem = {
      title: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      addOns: item.addOns,
    };
    navigation.navigate("FoodDetail", { foodItem });
  };

  const handleFavoritePress = (item) => {
    if (favorites.some((fav) => fav.name === item.name)) {
      removeFromFavorites(item);
    } else {
      addToFavorites(item);
    }
  };

  const onScroll = useCallback(
    (event) => {
      const y = event.nativeEvent.contentOffset.y;
      let newActiveCategory = categoriesData.categories[0].title;
      let minDistance = Infinity;

      categoriesData.categories.forEach((category, index) => {
        const distance = Math.abs(y - index * 300); // Approximate section height
        if (distance < minDistance) {
          minDistance = distance;
          newActiveCategory = category.title;
        }
      });

      if (newActiveCategory !== activeCategory) {
        setActiveCategory(newActiveCategory);
        categoryScrollViewRef.current?.scrollTo({
          x:
            categoriesData.categories.findIndex(
              (cat) => cat.title === newActiveCategory
            ) * 120,
          animated: true,
        });
      }
    },
    [activeCategory]
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <DeliveryOptions
        selectedDelivery={selectedDelivery}
        setSelectedDelivery={setSelectedDelivery}
      />
      <SectionList
        ref={sectionListRef}
        sections={categoriesData.categories}
        keyExtractor={(item, index) => {
          const firstProduct = item[0]?.name || "product1";
          const secondProduct = item[1]?.name || "product2";
          return `${firstProduct}-${secondProduct}-${index}`;
        }}
        renderItem={({ item }) => (
          <ProductRow
            products={item}
            handleAddToBucket={handleAddToBucket}
            handleCustomizePress={handleCustomizePress}
            handleFavoritePress={handleFavoritePress}
            favorites={favorites}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
        stickySectionHeadersEnabled={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={() => (
          <ScrollView
            ref={categoryScrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            <CategoryList
              categories={categoriesData.categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              sectionListRef={sectionListRef}
            />
          </ScrollView>
        )}
      />
      <Toast config={toastConfig} />
      {bucketItems?.length > 0 && (
        <TouchableOpacity
          style={styles.viewBucketContainer}
          onPress={() => navigation.navigate("Bucket")}
        >
          <View style={styles.bucketLeft}>
            <Image
              source={{ uri: bucketItems[bucketItems.length - 1]?.image }}
              style={styles.bucketItemImage}
            />
            <Text style={styles.viewBucketText}>
              {`${bucketItems?.length} ${
                bucketItems?.length === 1 ? "item" : "items"
              }`}
            </Text>
          </View>

          <View style={styles.bucketRight}>
            <Text style={styles.viewBucketText}>
              Rs{" "}
              {bucketItems?.reduce((sum, item) => sum + item.totalPrice, 0) ||
                0}
            </Text>
            <Text style={styles.viewBucketButtonText}>View Bucket </Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  toastContainer: {
    padding: 6,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginHorizontal: 9,
  },
  toastText1: {
    fontSize: 14,
    color: "white",
    marginBottom: 4,
  },
  categoryScroll: {
    maxHeight: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "black",
    marginTop: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    flex: 1,
  },
  locationText: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
    flex: 1,
  },
  logo: {
    width: 60,
    height: 30,
    resizeMode: "contain",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  viewBucketContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4D0009",
    padding: 10,
  },
  bucketLeft: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
  },
  bucketItemImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  viewBucketText: {
    color: "white",
    fontSize: 14,
    marginLeft: 8,
  },
  bucketRight: {
    padding: 10,
    width: "70%",
    paddingVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "red",
    borderRadius: 7,
  },
  viewBucketButtonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 16,
    fontWeight: "bold",
  },
});
