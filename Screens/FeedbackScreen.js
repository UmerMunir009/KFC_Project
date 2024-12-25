import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { ChevronLeft, Calendar } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FeedbackScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    orderId: '',
    feedbackChannel: '',
    feedbackType: '',
    store: '',
    date: new Date(),
    feedback: '',
  });
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.orderId) newErrors.orderId = 'Order ID is required';
    if (!formData.feedbackChannel) newErrors.feedbackChannel = 'Feedback channel is required';
    if (!formData.feedbackType) newErrors.feedbackType = 'Feedback type is required';
    if (!formData.store) newErrors.store = 'Store selection is required';
    if (!formData.feedback) newErrors.feedback = 'Feedback is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Feedback submitted successfully!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        orderId: '',
        feedbackChannel: '',
        feedbackType: '',
        store: '',
        date: new Date(),
        feedback: '',
      });
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  const renderInput = (label, value, field, placeholder, keyboardType = 'default') => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={(text) => setFormData({ ...formData, [field]: text })}
        keyboardType={keyboardType}
      />
      {errors[field] && <Text style={styles.errorText}>*</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {renderInput('Name', formData.name, 'name', 'Name')}
        {renderInput('Phone Number', formData.phone, 'phone', 'Phone Number (3XXXXXXXX)', 'phone-pad')}
        {renderInput('Email', formData.email, 'email', 'Email', 'email-address')}
        {renderInput('Order Id', formData.orderId, 'orderId', 'Order Id')}
        
        <TouchableOpacity 
          style={styles.input}
          onPress={() => {
            Alert.alert('Select Channel', '', [
              { text: 'Website', onPress: () => setFormData({ ...formData, feedbackChannel: 'Website' }) },
              { text: 'Mobile App', onPress: () => setFormData({ ...formData, feedbackChannel: 'Mobile App' }) },
              { text: 'Cancel', style: 'cancel' },
            ]);
          }}>
          <Text style={[styles.inputText, !formData.feedbackChannel && styles.placeholder]}>
            {formData.feedbackChannel || 'Feedback Channel'}
          </Text>
          {errors.feedbackChannel && <Text style={styles.errorText}>*</Text>}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.input}
          onPress={() => {
            Alert.alert('Select Type', '', [
              { text: 'Complaint', onPress: () => setFormData({ ...formData, feedbackType: 'Complaint' }) },
              { text: 'Suggestion', onPress: () => setFormData({ ...formData, feedbackType: 'Suggestion' }) },
              { text: 'Appreciation', onPress: () => setFormData({ ...formData, feedbackType: 'Appreciation' }) },
              { text: 'Cancel', style: 'cancel' },
            ]);
          }}>
          <Text style={[styles.inputText, !formData.feedbackType && styles.placeholder]}>
            {formData.feedbackType || 'Select Feedback Type'}
          </Text>
          {errors.feedbackType && <Text style={styles.errorText}>*</Text>}
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.input, styles.halfInput]}
            onPress={() => {
              Alert.alert('Select Store', '', [
                { text: 'Store 1', onPress: () => setFormData({ ...formData, store: 'Store 1' }) },
                { text: 'Store 2', onPress: () => setFormData({ ...formData, store: 'Store 2' }) },
                { text: 'Cancel', style: 'cancel' },
              ]);
            }}>
            <Text style={[styles.inputText, !formData.store && styles.placeholder]}>
              {formData.store || 'Select Store'}
            </Text>
            {errors.store && <Text style={styles.errorText}>*</Text>}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.input, styles.halfInput]}
            onPress={() => setShowDatePicker(true)}>
            <View style={styles.dateContainer}>
              <Text style={[styles.inputText]}>
                {formData.date.toLocaleDateString()}
              </Text>
              <Calendar color="#666" size={20} />
            </View>
          </TouchableOpacity>
        </View>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Feedback"
          placeholderTextColor="#666"
          value={formData.feedback}
          onChangeText={(text) => setFormData({ ...formData, feedback: text })}
          multiline
          numberOfLines={4}
        />
        {errors.feedback && <Text style={styles.errorText}>*</Text>}

        {showDatePicker && (
          <DateTimePicker
            value={formData.date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setFormData({ ...formData, date: selectedDate });
              }
            }}
          />
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginTop:30
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 16,
    color: 'white',
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF0000',
    position: 'absolute',
    right: 16,
    top: 16,
  },
  inputText: {
    color: 'white',
  },
  placeholder: {
    color: '#666',
  },
});