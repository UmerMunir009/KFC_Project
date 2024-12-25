import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Sidebar from "../components/sidebar.js";
import DraggableBucket from "../components/draggable-bucket.js";
import Header from "../components/Header";
import DeliveryOptions from "../components/DeliveryOptions";
import PromoSlider from "../components/PromoSlider";
import ExploreMenu from "../components/ExploreMenu";
import BestSellers from "../components/BestSellers";
import TopDeals from "../components/TopDeals";
import PickUpImage from "../components/pickupImage";

export default function HomeScreen() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const navigation = useNavigation();

  const openSidebar = () => {
    setIsSidebarVisible(true);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const handleBestSellerPress = (item) => {
    navigation.navigate("FoodDetail", { foodItem: item });
  };

  const handleViewAllPress = () => {
    navigation.navigate("ViewAll");
  };

  const data = [
    { key: "promoSlider", component: <PromoSlider /> },
    {
      key: "exploreMenu",
      component: <ExploreMenu handleViewAllPress={handleViewAllPress} />,
    },
    {
      key: "bestSellers",
      component: <BestSellers handleBestSellerPress={handleBestSellerPress} />,
    },
    {
      key: "topDeals",
      component: <TopDeals handleBestSellerPress={handleBestSellerPress} />,
    },
    {
      key: "pickUpImage",
      component: <PickUpImage handleBestSellerPress={handleViewAllPress} />,
    },
  ];
  const renderItem = ({ item }) => <View>{item.component}</View>;

  return (
    <TouchableWithoutFeedback onPress={closeSidebar}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Sidebar isVisible={isSidebarVisible} onClose={closeSidebar} />

        <Header openSidebar={openSidebar} />

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
        />

        <DraggableBucket />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    flex: 1,
    backgroundColor: "#000000",
  },
});
