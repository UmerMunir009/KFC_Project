import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';
import { ChevronLeft, MapPin, Phone } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import officeLocations from '../data/officeLocations.json';


export default function ContactUsScreen() {
  const navigation = useNavigation();

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 ,marginTop:50}}>
        <TouchableOpacity style={{ marginBottom: 16 }} onPress={() => navigation.goBack()}>
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>    
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 15,
            marginBottom: 16,
          }}>
          CONTACT US
        </Text>
      </View>


      <ScrollView style={styles.scrollView}>
        {officeLocations.map((office, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{office.title}</Text>
            
            <TouchableOpacity 
              style={styles.contactRow}
              onPress={() => handleCall(office.phone)}>
              <Phone color="#FF0000" size={20} />
              <Text style={styles.phoneNumber}>{office.phone}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.contactRow}
              onPress={() => handleLocation(office.address)}>
              <MapPin color="#FF0000" size={20} />
              <Text style={styles.address}>{office.address}</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Helpline</Text>
          <TouchableOpacity 
            style={styles.contactRow}
            onPress={() => handleCall('111532532')}>
            <Phone color="#FF0000" size={20} />
            <Text style={styles.phoneNumber}>UAN: 111 532 532</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    padding: 16,
  },
  card: {
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  phoneNumber: {
    color: 'white',
    marginLeft: 12,
    fontSize: 16,
  },
  address: {
    color: 'white',
    marginLeft: 12,
    fontSize: 16,
    flex: 1,
  },
});