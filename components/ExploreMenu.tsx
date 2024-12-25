import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MenuItem from './MenuItem';
import menuItems from '../data/menuItems.json';

export default function ExploreMenu({ handleViewAllPress }: { handleViewAllPress: () => void }) {
  const menuItemsArray = Object.entries(menuItems).map(([title, data]) => ({
    title,
    image: data.image
  }));

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[ styles.titleUnderlined,styles.title]}>Explo</Text>
          <Text style={styles.title}>re Menu</Text>
        </View>
        <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllPress}>
          <Text style={styles.viewAllText}>VIEW ALL</Text>
          <Text style={styles.viewAllArrow}>→</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.gridContainer}>
        <View style={styles.leftColumn}>
          <MenuItem
            title={menuItemsArray[0].title}
            image={menuItemsArray[0].image}
            onPress={handleViewAllPress}
            containerStyle={styles.largeItem}
          />
        </View>
      
        <View style={styles.rightColumn}>
          <View style={styles.rightTopRow}>
            <MenuItem
              title={menuItemsArray[1].title}
              image={menuItemsArray[1].image}
              onPress={handleViewAllPress}
              containerStyle={styles.smallItem}
            />
            <MenuItem
              title={menuItemsArray[2].title}
              image={menuItemsArray[2].image}
              onPress={handleViewAllPress}
              containerStyle={styles.smallItem}
            />
          </View>
          <View style={styles.rightBottomRow}>
            <MenuItem
              title={menuItemsArray[3].title}
              image={menuItemsArray[3].image}
              onPress={handleViewAllPress}
              containerStyle={styles.smallItem}
            />
            <MenuItem
              title={menuItemsArray[4].title}
              image={menuItemsArray[4].image}
              onPress={handleViewAllPress}
              containerStyle={styles.smallItem}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 16,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleUnderlined: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderBottomColor: '#FF0000',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginRight: 8,
  },
  viewAllArrow: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  leftColumn: {
    flex: 0.65,
  },
  rightColumn: {
    flex: 1,
    gap: 12,
  },
  rightTopRow: {
    flexDirection: 'row',
    gap: 10,
    
  },
  rightBottomRow: {
    flexDirection: 'row',
    gap: 10,
  },
  largeItem: {
    height: 300,
  },
  smallItem: {
    flex: 1,
    height: 145,
  },
});

