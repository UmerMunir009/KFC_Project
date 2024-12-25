import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryList({ categories, activeCategory, setActiveCategory, sectionListRef }) {
  return categories.map((category) => (
    <TouchableOpacity
      key={category.title}
      style={[
        styles.categoryItem,
        activeCategory === category.title && styles.activeCategoryItem,
      ]}
      onPress={() => {
        setActiveCategory(category.title);
        sectionListRef.current?.scrollToLocation({
          sectionIndex: categories.findIndex(
            (cat) => cat.title === category.title
          ),
          itemIndex: 0,
          animated: true,
        });
      }}>
      <Text
        style={[
          styles.categoryText,
          activeCategory === category.title && styles.activeCategoryText,
        ]}>
        {category.title}
      </Text>
    </TouchableOpacity>
  ));
}

const styles = StyleSheet.create({
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  activeCategoryItem: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  categoryText: {
    color: 'gray',
    fontSize: 16,
  },
  activeCategoryText: {
    color: 'red',
  },
});