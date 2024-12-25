import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { X, Navigation2 } from 'lucide-react-native';
import locations from '../data/locations.json';

const PickupLocation = ({ visible, onClose, onSelectLocation }) => {
  const [searchText, setSearchText] = useState('');
  const [orderStarted, setOrderStarted] = useState(false);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchText.toLowerCase()) ||
    location.address.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleStartOrder = () => {
    setOrderStarted(true);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X color="white" size={24} />
          </TouchableOpacity>

          <Text style={styles.title}>Select Pickup Point</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Store name"
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={setSearchText}
          />

          <ScrollView style={styles.locationList}>
            {filteredLocations.map((location) => (
              <View key={location.id} style={styles.locationCard}>
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>{location.name}</Text>
                  <Text style={styles.locationAddress}>{location.address}</Text>
                  <Text style={styles.locationHours}>{location.hours}</Text>
                  <Text style={styles.locationDistance}>
                    Distance to store: {location.distance} Km
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.navigationButton}
                  onPress={() => onSelectLocation(location)}
                >
                  <Navigation2 color="white" size={24} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity 
            style={[styles.startOrderButton, orderStarted && styles.startedButton]}
            onPress={handleStartOrder}
          >
            <Text style={styles.startOrderText}>
              START YOUR ORDER
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    maxHeight:'65%',
    width:'90%'
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
    backgroundColor: '#E4002B',
    padding: 8,
    borderRadius: 8,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#111111',
    color: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  locationList: {
    flex: 1,
  },
  locationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  locationInfo: {
    flex: 1,
    marginRight: 10,
  },
  locationName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationAddress: {
    color: 'white',
    fontSize: 12,
    marginBottom: 5,
  },
  locationHours: {
    color: '#E4002B',
    fontSize: 12,
    marginBottom: 5,
  },
  locationDistance: {
    color: 'white',
    fontSize: 12,
  },
  navigationButton: {
    backgroundColor: '#E4002B',
    padding: 5,
    borderRadius: 8,
  },
  startOrderButton: {
    backgroundColor: '#E4002B',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  startedButton: {
    backgroundColor: '#8B0000',
  },
  startOrderText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PickupLocation;

