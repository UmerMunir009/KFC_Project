import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import FoodDetailScreen from '../Screens/FoodDetailScreen';
import AboutUsScreen from '../Screens/AboutUsScreen';
import ContactUsScreen from '../Screens/ContactUsScreen';
import TnCScreen from '../Screens/TnCScreen';
import Sidebar from '../components/sidebar';
import ViewAllScreen from '../Screens/ViewAllScreen';
import SearchScreen from '../Screens/SearchScreen';
import FeedbackScreen from '../Screens/FeedbackScreen';
import BucketContentScreen from '../Screens/BucketContentScreen';
import FavoriteScreen from '../Screens/FavoritesScreen';
import SignOutScreen from '../components/SignOutScreen';
import { BucketProvider } from '../BucketContext';
import { FavoritesProvider } from '../FavoritesContext';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <FavoritesProvider>
      <BucketProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sidebar"
              component={Sidebar}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FoodDetail"
              component={FoodDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AboutUs"
              component={AboutUsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewAll"
              component={ViewAllScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SearchScreen"
              component={SearchScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Feedback"
              component={FeedbackScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ContactUs"
              component={ContactUsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TnC"
              component={TnCScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Bucket"
              component={BucketContentScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Fav"
              component={FavoriteScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignOut"     
              component={SignOutScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </BucketProvider>
    </FavoritesProvider>
  );
};

export default AppNavigator;
