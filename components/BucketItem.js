import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Trash, Plus, Minus } from 'lucide-react-native';

const BucketItem = ({ item, onRemove, onAdd, onSubtract }) => {
  return (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.title || item.name}</Text>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </View>

      <View style={styles.addedItemsContainer}>
        {item.addedItems && item.addedItems.length > 0 ? (
          item.addedItems.map((addedItem, index) => (
            <Text key={index} style={styles.addedItemText}>
              {addedItem.name} x{addedItem.quantity}
            </Text>
          ))
        ) : (
          <Text style={styles.addedItemText}>No added items</Text>
        )}
      </View>
      <View style={styles.itemControls}>
        <Text style={styles.price}>
          {' '}
          Rs {item.totalPrice ? item.totalPrice.toFixed(2) : '0.00'}
        </Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            onPress={() => onSubtract(item)}
            style={styles.iconButton}>
            {item.quantity === 1 ? (
              <Trash color="white" size={20} />
            ) : (
              <Minus color="white" size={20} />
            )}
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => onAdd(item)}
            style={styles.iconButton}>
            <Plus color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom:2

  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  itemSubtext: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  addedItemsContainer: {
    marginTop: 8,
  },
  addedItemText: {
    color: '#999',
    fontSize: 12,
  },
  itemControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  price: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  quantity: {
    color: '#fff',
    fontSize: 16,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e31837',
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
  },
  removeButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BucketItem;
