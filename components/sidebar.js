import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  User,
  MapPin,
  Heart,
  ClipboardList,
  Grid,
  Info,
  MessageSquare,
  FileText,
  Shield,
  Headphones,
  Utensils,
  Briefcase,
  List,
  X,
  LogOut
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Sidebar({ isVisible, onClose }) {
  const [isNightMode, setIsNightMode] = useState(true);
  const navigation = useNavigation();

  if (!isVisible) return null;

  const handleAboutUsPress = () => {
    navigation.navigate('AboutUs');
  };
  const handleContactUsPress = () => {
    navigation.navigate('ContactUs');
  };

  const handleExploreMenuPress = () => {
    navigation.navigate('ViewAll');
  };

  const handleFeedbackPress = () => {
    navigation.navigate('Feedback');
  };
  const handleTnCPress = () => {
    navigation.navigate('TnC');
  };
  const handleFavCPress = () => {
    navigation.navigate('Fav');
  };

  const navigationData = [
    {
      id: 'favourites',
      icon: <Heart color="white" size={24} />,
      text: 'My Favourites',
      onPress: handleFavCPress,
    },
    {
      id: 'orders',
      icon: <List color="white" size={24} />,
      text: 'My Orders',
      onPress: () => {},
    },
    {
      id: 'trackOrder',
      icon: <ClipboardList color="white" size={24} />,
      text: 'Track Order',
      onPress: () => {},
    },
    {
      id: 'exploreMenu',
      icon: <Grid color="white" size={24} />,
      text: 'Explore Menu',
      onPress: handleExploreMenuPress,
    },
    {
      id: 'aboutUs',
      icon: <Info color="white" size={24} />,
      text: 'About Us',
      onPress: handleAboutUsPress,
    },
    {
      id: 'feedback',
      icon: <MessageSquare color="white" size={24} />,
      text: 'Feedback',
      onPress: handleFeedbackPress,
    },
    {
      id: 'tnc',
      icon: <FileText color="white" size={24} />,
      text: 'Terms & Conditions',
      onPress: handleTnCPress,
    },
    {
      id: 'privacyPolicy',
      icon: <Shield color="white" size={24} />,
      text: 'Privacy Policy',
      onPress: () => {},
    },
    {
      id: 'contactUs',
      icon: <Headphones color="white" size={24} />,
      text: 'Contact Us',
      onPress: handleContactUsPress,
    },
    {
      id: 'mitaoBhook',
      icon: <Utensils color="white" size={24} />,
      text: 'Mitao Bhook',
      onPress: () => {},
    },
    {
    id: 'signOut',
    icon: <LogOut color="white" size={24} />,
    text: 'Sign Out',
    onPress: () => navigation.navigate('SignOut'),
  },
  ];
   
  const renderNavItem = ({ item }) => (
    <TouchableOpacity style={styles.navItem} onPress={item.onPress}>
      {item.icon}
      <Text style={styles.navText}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={navigationData}
        keyExtractor={(item) => item.id}
        renderItem={renderNavItem}
        ListHeaderComponent={() => (
          <>
            {/* Login Section */}
            <View style={styles.loginSection}>
              <User color="white" size={32} />
              <View style={styles.loginText}>
                <Text style={styles.loginTitle}>Welcome</Text>
                <Text style={styles.loginSubtitle}>Explore KFC App</Text>
              </View>
            </View>

            {/* Theme Toggle */}
            <View style={styles.themeToggleContainer}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X color="white" size={24} />
              </TouchableOpacity>
              <View style={styles.themeToggle}>
                <Text
                  style={[
                    styles.themeText,
                    isNightMode && styles.themeTextActive,
                  ]}>
                  Night
                </Text>
                <Switch
                  value={!isNightMode}
                  onValueChange={(value) => setIsNightMode(!value)}
                  trackColor={{ false: '#E4002B', true: '#E4002B' }}
                  thumbColor="white"
                />
                <Text
                  style={[
                    styles.themeText,
                    !isNightMode && styles.themeTextActive,
                  ]}>
                  Day
                </Text>
              </View>
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Text style={styles.version}>KFC 3.1.0</Text>
          </View>
        )}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#000000',
    zIndex: 1000,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topSpacer: {
    height: 40,
  },
  loginSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginTop: 25,
  },
  loginText: {
    marginLeft: 15,
  },
  loginTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loginSubtitle: {
    color: 'white',
    fontSize: 16,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  closeButton: {
    padding: 8,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeText: {
    color: '#666',
    marginHorizontal: 8,
  },
  themeTextActive: {
    color: 'white',
  },
  navigation: {
    padding: 20,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  navText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  version: {
    color: '#666',
    textAlign: 'center',
  },
});
