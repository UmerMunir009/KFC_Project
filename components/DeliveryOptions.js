import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Truck, User } from 'lucide-react-native';
import PickUpLocationsModal from './PickUpLocationsModal';
import DeliveryLocationModal from './DeliveryLocationModal';

export default function DeliveryOptions({ selectedDelivery, setSelectedDelivery }) {
  const [isPickupModalVisible, setIsPickupModalVisible] = useState(false);
  const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState(false);

  const handleDeliveryPress = () => {
    setSelectedDelivery('delivery');
    setIsDeliveryModalVisible(true);
  };

  const handlePickupPress = () => {
    setSelectedDelivery('pickup');
    setIsPickupModalVisible(true);
  };

  const handleDeliveryLocationConfirm = (locationData) => {
    console.log('Delivery location confirmed:', locationData);
    // Handle the confirmed location data
  };

  return (
    <View style={styles.deliveryOptions}>
      <TouchableOpacity
        style={[
          styles.deliveryButton,
          selectedDelivery === 'delivery' && styles.selectedButton,
        ]}
        onPress={handleDeliveryPress}
      >
        <Truck color="white" size={24} />
        <Text style={styles.deliveryButtonText}>Delivery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.deliveryButton,
          selectedDelivery === 'pickup' && styles.selectedButton,
        ]}
        onPress={handlePickupPress}
      >
        <User color="white" size={24} />
        <Text style={styles.deliveryButtonText}>Pickup</Text>
      </TouchableOpacity>

      <PickUpLocationsModal
        visible={isPickupModalVisible}
        onClose={() => setIsPickupModalVisible(false)}
        onSelectLocation={(location) => {
          console.log('Selected location:', location);
          setIsPickupModalVisible(false);
        }}
      />

      <DeliveryLocationModal
        visible={isDeliveryModalVisible}
        onClose={() => setIsDeliveryModalVisible(false)}
        onConfirmLocation={handleDeliveryLocationConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  deliveryOptions: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },    
  deliveryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    padding: 8,
    borderRadius: 8,
    gap: 8,
  },
  selectedButton: {
    backgroundColor: '#E4002B',
  },
  deliveryButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

