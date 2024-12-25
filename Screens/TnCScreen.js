import { Text, SafeAreaView,ScrollView, StyleSheet,View,TouchableOpacity,FlatList } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';


const TermsOfUseScreen = () => {
  const navigation = useNavigation();


  const termsData = [
    { id: '1', type: 'heading', text: 'Terms of Use' },
    { id: '2', type: 'paragraph', text: 'These Terms of Use ("Terms") govern your use of the KFC Corporation ("KFC") websites on which they appear, and your use of the features therein...' },
    { id: '3', type: 'subHeading', text: 'NO WARRANTY/LIMITATION ON LIABILITY' },
    { id: '4', type: 'paragraph', text: 'KFC strives to ensure that the information contained in this website is accurate and reliable. However, KFC and the World Wide Web (or Web Site Host) are not infallible and errors may sometimes occur...' },
    { id: '5', type: 'subHeading', text: 'COMMUNICATING WITH KFC' },
    { id: '6', type: 'paragraph', text: 'On certain areas of our Site, you may be given the ability to contact us by electronic mail...' },
    { id: '7', type: 'subHeading', text: 'KFC PROPERTY' },
    { id: '8', type: 'paragraph', text: 'This website contains many valuable trademarks owned and used by KFC Corporation, and its subsidiaries and affiliates throughout the world...' },
    { id: '9', type: 'subHeading', text: 'USER-SUBMITTED CONTENT' },
    { id: '10', type: 'paragraph', text: 'On certain areas of our Site, you may be able to submit text, files, images, photos, videos, sounds, musical works, works of authorship, and other materials...' },
    { id: '11', type: 'subHeading', text: 'ONLINE PURCHASES' },
    { id: '12', type: 'paragraph', text: 'To purchase merchandise or other items through the website, you must provide valid credit card and billing information...' },
    { id: '13', type: 'subHeading', text: 'ARBITRATION AND DISPUTE RESOLUTION' },
    { id: '14', type: 'paragraph', text: 'Any controversy or claim arising out of or relating to your use of the KFC site or your Submitted Content shall be settled by binding arbitration...' },
    { id: '15', type: 'subHeading', text: 'GOVERNING LAW AND JURISDICTION' },
    { id: '16', type: 'paragraph', text: 'These Terms are governed by US law and are subject to all applicable federal, state, and local laws and regulations...' },
  ];

  // Render each item in the FlatList
  const renderItem = ({ item }) => {
    if (item.type === 'heading') {
      return <Text style={styles.heading}>{item.text}</Text>;
    }
    if (item.type === 'subHeading') {
      return <Text style={styles.subHeading}>{item.text}</Text>;
    }
    if (item.type === 'paragraph') {
      return <Text style={styles.paragraph}>{item.text}</Text>;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 50 }}>
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
          Terms & Conditions
        </Text>
      </View>

      <FlatList
        data={termsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.container2}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#000',
  },
  container2: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    padding:10
  },
  
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 15,
    fontWeight: '600',
    color: 'red',
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: '#e0e0e0',
    lineHeight: 22,
    marginBottom: 12,
  },
});

export default TermsOfUseScreen;


