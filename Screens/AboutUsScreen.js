import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const AboutUsScreen = () => {
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 ,marginTop:25}}>
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
          ABOUT US
        </Text>
      </View>
     

<ScrollView style={styles.container}>
      <View style={styles.greyContainer}>
        <Text style={styles.content}>
          KFC entered Pakistan in 1997 and since then, it’s been a journey full
          of excitement and Finger Lickin’ goodness! The first KFC restaurant
          opened in Pakistan opened in Gulshan Iqbal, Karachi and now our Finger
          Lickin’ Chicken is available in 37 cities with over 128 restaurants!
          Being the most loved fast food chain in Pakistan, KFC leaves no stone
          unturned to provide its customers the most delicious chicken and an
          excellent dining experience.
        </Text>
        <View style={styles.redBox}>
          <Text style={styles.redBoxText}>
            WE PRIDE OURSELVES ON USING QUALITY HALAL CHICKEN AND LOCAL
            INGREDIENTS FROM TRUSTED SUPPLIERS
          </Text>
        </View>
      </View>

      <View style={styles.greyContainer}>
        <Image
          source={{
            uri: 'https://www.kfcpakistan.com/static/media/history-img.599c12141403abf0beb5.png',
          }}
          style={styles.historyImage}
        />
        <Text style={styles.historyText}>History</Text>
        <Text style={styles.content}>
          It all started with Colonel Harland Sanders, the man who convinced the
          world by saying “We do chicken right!” Sanders took a great deal of
          time perfecting his iconic secret recipe of 11 herbs and spices, a
          legacy he’s brought to the world through KFC’s 10,000+ restaurants.
          Starting from outside of his gas station in Korbin, Kentucky to being
          a globally recognized face, we owe our success to the Colonel’s hard
          work and passion for sharing his love for chicken with the world!
        </Text>
      </View>

      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          marginVertical: 20,
          fontSize: 28,
          fontWeight: 'bold',
        }}>
        Fast Facts about KFC Pakistan
      </Text>
      <View style={styles.greyContainer}>
        <Image
          source={{
            uri: 'data:image/png;base64,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',
          }}
          style={styles.remainImage}
        />
        <Text style={styles.historyText}>1997</Text>
        <Text style={styles.content}>
          The first KFC restaurant in Pakistan opened in 1997 and was located in
          Gulshan-e-Iqbal Karachi.
        </Text>
      </View>
      <View style={styles.greyContainer}>
        <Image
          source={{
            uri: 'data:image/png;base64,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',
          }}
          style={styles.remainImage}
        />
        <Text style={styles.historyText}>128</Text>
        <Text style={styles.content}>
          Today KFC has grown to over 128 restaurants across the country
        </Text>
      </View>
      <View style={styles.greyContainer}>
        <Image
          source={{
            uri: 'data:image/png;base64,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',
          }}
          style={styles.remainImage}
        />
        <Text style={styles.historyText}>9</Text>
        <Text style={styles.content}>
          Giving back to the community, KFC runs 9 restaurants operated by deaf,
          Hearing With Heart team members
        </Text>
      </View>
      <View style={styles.greyContainer}>
        <Image
          source={{
            uri: 'data:image/png;base64,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',
          }}
          style={styles.remainImage}
        />
        <Text style={styles.historyText}>9000+</Text>
        <Text style={styles.content}>
          Our Finger Lickin’ Chicken is brought to you by the hardwork of a team
          of 9000+ people across Pakistan
        </Text>
      </View>
      <View style={styles.greyContainer}>
        <Image
          source={{
            uri: 'https://www.kfcpakistan.com/static/media/mitaobhook_new.69e619b89226c989f8bd.png',
          }}
          style={styles.historyImage}
        />
        <Text style={styles.content}>
          is KFC’s pledge to give back to society. Over the years we have made
          it our mission to spread the message of hope, bringing positive change
          in the lives of people and providing better living standards. Mitao
          Bhook strengthens the community on the pillars of Education, Inclusion
          & Diversity.
        </Text>
      </View>
      <View style={styles.greyContainer}>
        <Image
          source={{
            uri: 'https://www.kfcpakistan.com/static/media/orange.fdf7006b20f61e8cb4ce.png',
          }}
          style={{width:150,height:150}}
        />
        <Text style={styles.content}>
          Sponsoring higher education of 200+ students across HEC recognized universities in Pakistan
        </Text>
      </View>
      <View style={styles.greyContainer}>
        <Image
          source={{
            uri: 'https://www.kfcpakistan.com/static/media/cyte.5a383a40c92b2062984c.png',
          }}
          style={{width:150,height:150}}
        />
        <Text style={styles.content}>
          Supporting TEGS – KFC Campus to provide quality education to students in Lahore
        </Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000', // Background color matching the screenshot
  },
  greyContainer: {
    backgroundColor: '#1A1A1A',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 16,
    lineHeight: 14,
    textAlign: 'center',
  },
  redBox: {
    backgroundColor: '#D50000',
    padding: 16,
    marginVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  redBoxText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  historyImage: {
    width: 200, // adjust width and height as needed
    height: 200,
    borderRadius: 8,
  },
  remainImage: {
    width: 70, // adjust width and height as needed
    height: 70,
    borderRadius: 8,
  },
  historyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default AboutUsScreen;
