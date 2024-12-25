import React, { useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBucket } from '../BucketContext';
import { ArrowLeft, ChevronRight, ArrowRight } from 'lucide-react-native';
import BucketItem from '../components/BucketItem';
import RecommendedItem from '../components/RecommentedItem';

import { StyleSheet } from 'react-native';
const recommendedItems = [
  {
    id: '1',
    name: 'One Piece Chicken',
    price: 320,
    image: 'https://www.kfcpakistan.com/images/43a95f10-ffaa-11ed-b673-4121381f04c6-1PcChicken_variant_0-2023-05-31115706.png',
  },
  {
    id: '2',
    name: 'Hot Shots',
    price: 480,
    image: 'https://www.kfcpakistan.com/images/43a95f10-ffaa-11ed-b673-4121381f04c6-HotShots_variant_0-2023-05-31115706.png',
  },
  {
    id: '3',
    name: 'Spicy Nuggets',
    price: 580,
    image: 'https://www.kfcpakistan.com/images/43aa4970-ffaa-11ed-9c55-3705f003c528-3_variant_0-2023-05-31115706.png',
  },
  {
    id: '4',
    name: 'Hot Wings Bucket (10 pcs)',
    price: 550,
    image: 'https://www.kfcpakistan.com/images/38718ee0-bc17-11ee-97ca-ad9c0958c4fc-Plain-wings-min_variant_0-2024-01-26065041.png',
  },
  {
    id: '5',
    name: 'Corn on the Cob',
    price: 290,
    image: 'https://www.kfcpakistan.com/images/33685b40-0461-11ee-911c-497570899609-Corn_variant_0-2023-06-06115641.png',
  },
 
  {
    id: '6',
    name: 'Coleslaw',
    price: 150,
    image: 'https://www.kfcpakistan.com/images/43a98620-ffaa-11ed-b6b3-6970cc1cd666-Coleslaw_variant_0-2023-05-31115706.png',
  },
  {
    id: '7',
    name: 'Dinner Roll',
    price: 50,
    image: 'https://www.kfcpakistan.com/images/62153aa0-0513-11ee-8eee-c7aabf77bad4-Dinner-Roll-copy_variant_0-2023-06-07091210.png',
  },
  {
    id: '8',
    name: '7up Regular',
    price: 180,
    image: 'https://www.kfcpakistan.com/images/6249b820-0513-11ee-9e45-cb0ed000d4a6-7up_variant_0-2023-06-07091210.png',
  },
];

export default function BucketContentScreen() {
  const navigation = useNavigation();
  const { bucketItems, addToBucket, removeFromBucket } = useBucket();

  const handleAddItem = (item) => {
    addToBucket({ ...item, quantity: item.quantity + 1 });
  };

  const handleSubtractItem = (item) => {
    removeFromBucket(item);
  };

  const handleExploreMenuPress = () => {
    navigation.navigate('ViewAll');
  };

  const { subtotal, gst, total } = useMemo(() => {
    const subtotal = bucketItems.reduce((sum, item) => {
      const itemTotal = item.totalPrice ;
      return sum + itemTotal;
    }, 0);
    const gst = subtotal * 0.16; // 16% GST
    const total = subtotal + gst;
    return { subtotal, gst, total };
  }, [bucketItems]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
            accessibilityRole="button">
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <Image
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAoCAYAAAC2LgceAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAM3RFWHRDb21tZW50AHhyOmQ6REFGZnNzalZxNkk6MixqOjQ0OTA1NDcyODEyLHQ6MjMwNDEwMTAq76EpAAAE/mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8eDp4bXBtZXRhIHhtbG5zOng9J2Fkb2JlOm5zOm1ldGEvJz4KICAgICAgICA8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgICAgICAgPGRjOnRpdGxlPgogICAgICAgIDxyZGY6QWx0PgogICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+VW50aXRsZWQgZGVzaWduIC0gMTwvcmRmOmxpPgogICAgICAgIDwvcmRmOkFsdD4KICAgICAgICA8L2RjOnRpdGxlPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOkF0dHJpYj0naHR0cDovL25zLmF0dHJpYnV0aW9uLmNvbS9hZHMvMS4wLyc+CiAgICAgICAgPEF0dHJpYjpBZHM+CiAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgICAgICAgPEF0dHJpYjpDcmVhdGVkPjIwMjMtMDQtMTA8L0F0dHJpYjpDcmVhdGVkPgogICAgICAgIDxBdHRyaWI6RXh0SWQ+ZWYwMzMwNWItN2FhMC00Nzk3LTk4ZTgtZDY1NWJhOTg3NWFhPC9BdHRyaWI6RXh0SWQ+CiAgICAgICAgPEF0dHJpYjpGYklkPjUyNTI2NTkxNDE3OTU4MDwvQXR0cmliOkZiSWQ+CiAgICAgICAgPEF0dHJpYjpUb3VjaFR5cGU+MjwvQXR0cmliOlRvdWNoVHlwZT4KICAgICAgICA8L3JkZjpsaT4KICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgPC9BdHRyaWI6QWRzPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgICAgICAgPHBkZjpBdXRob3I+TWFyayBzcGVuc2VyPC9wZGY6QXV0aG9yPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5DYW52YTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICAgIDwvcmRmOlJERj4KICAgICAgICA8L3g6eG1wbWV0YT6rf04nAAAF/ElEQVR4nO2ZUWgcVRSGPyVCmMmDYCdUsOwKBetSsWLBOlOxomBFpbNooWIFBaUt9UHQofah2IKllmuhBYUWFS0KFqzsPqQQoWAeMkPEFFoIoUIeJhgh7A0YMDMW3AcfdiZONnPvzBRBhP1gYXfOuWfO/nfuuWfv3sGA0tzxXyfwf2IgVgUGYlVgIFYFBmJVYCBWBQZiVUApVovaYQdze4kYXZfwaEC8lBn7roO5tcS4Y8CtNvVTwHC5lPW4hGcC4hmV3ca4x8HcZWPscDC3AHVgJPNaBJaB0CeaDognfSI/IO4OqYI6mB8Cd5dJ0ME8nYplY4w4mB+XHPcpsBk4WMa/ZMwreWJ5WHs8rIPAM4Dye9MTD2Cbg+k6mAAHA+ILuYM8rPsoKRSwJJBzmWTrGt8syz7RjIP5fEn/skxnP3hYj3pY54Eyq0TFbwB35lkEcsEnagIrBUHGXcKH+sbO+EQnFP5d4HOBfMol3BQQd32icz7R+arZK1gSyDD90KJ22MOaolioRSBM8stjCgoKfIfGt8A+ld0lvDcgXsxeszE2tqm3gB197ss+UbPJ/ER/HBtjqE39T9TLY0wgz+SMcxzM45lxY6PMvgjQovZBYlMR+kSnBfJSQLycxLvbwzrlYGbLQjjK7P1okktRKQ0wkyPUA23qbWBLf2Iu4XMB8U1FLG0eAvmDQE7kmCY6NHYALwD4RNMALWqvFgh12SV8IyBes3IC4uUm84c6NLYCO5PLq8s6dxlm0O1o/bXhsTb1CdYLdd0lfFwjFMnOqRNsSmNb3YUD4p9sjI0O5ica/6su4Sv9QmURyKuZ96v3ViZoYwyjEUsgr6XvW9T2OJjf0Nt6s4y7hHt1iSU8prF1fSJlK+ASHnMwLwL4RJNt6p+h3pxuJU+UbsUAXAMm6K2sK+lFXetQarZb1A4kM9nv+5VL+FaJxPCwtmnMMwHxLZUxIF4IiBcAbIwNaGqsT3Q+9dUhkGMCOdZ/XbcMC2e7Re2Ug3mePqF8ouOjzJaZwZT+zSDLZMkYOJgvoWluA+ILZWPlodwNOzS+BvYrzNeBmTy7T/Rmk/kvyiZgY4y0qf+hsvtE4wGxqmbNCOT3mZxbgKvwXRhldlPZvPLQLTPd0thaYC+Ng6mN42DudjB3K8ztrFj8s4Plcb1ycn3kLkMbYwT9TqirdWdtjHqFHHTLXUvaKsBqzhs07ksaWylyxSqabUDZBgAjberf2hhFPRwAHpauXmkJiG+k7x1MnVD/CqovpJvtFZ/oNQfzZ43PDg/r3Sbzp0vkoJuYMHnl0fWJJkrETyk6BSkkt8B3aHwHvKwYMznK7BMFGwBAVyC3C+QNlYOHtcHDkiq7QO4VyMuae6yhQ+Mv1A/ALZfw/v5fHVVQtQ7K2U7rhECeQP9zaMjDupQ0tyqKlmDVojytsQ17WIcrxlvDOrE8rA30zphyCYivAQjknE+k+1kBsMXDEiqjjfGwZuxy9uinDD7RJZ3dwXy/Re3ZKjGz5D1ZRcFWZy95urS7jIP5dova0wqb7snSPSW5CORFeqecKoYczLEWtSMFTzw2xnC/z7qa1aHxI7BLFcQlvCvbmbeove5gfqm7MbDoEj7SXy86NCTq7b49ymyzIO46WtT2O5hfl3BdpHf0M0VvwoeAERtjc9IN7BLIjwTyZDpgVSwbY9jDOlJwtIFPdFYgj2Z/rxV0zik3BXJfWvA9rPs8rF81/l2fyG0yf0Xjk0uLmnAw36s6rh+BPCSQqweTdwJ4WBvb1H8vEgrAwXzHwTyQveYSvkbxstniYV3v0PgjqYtFxX3IwRxLfCvRZN7zid5BvwGVYc13SmvWTqr9u/JL9kNAvOISPgVoC2xCVyCXbIwynfuSQN5W591k/pxAPghc5vZEW/GJ1jTfaU+yQO/8pgzLPtG6k4CAeGWU2Vc8rJM2xp7kiGdjzvj0PnMl7jleMqdcBHJOIPcmf8Ds9rCepNec1ll75rVMr4bN+UQ3A2LfJ7rafw43+JO1AgOxKjAQqwIDsSowEKsCA7EqMBCrAgOxKvA3nHb9gDFPkRAAAAAASUVORK5CYII=',
            }}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Bucket</Text>

        {/* Items List */}
        <FlatList
          data={bucketItems}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>Your bucket is empty.</Text>
          }
          renderItem={({ item }) => (
            <BucketItem
              item={item}
              onRemove={removeFromBucket}
              onAdd={handleAddItem}
              onSubtract={handleSubtractItem}
            />
          )}
        />

        <View>
          <TouchableOpacity style={styles.card} onPress={handleExploreMenuPress}>
            <View style={styles.textContainer}>
              <Text style={styles.exploretitle}>Explore Menu</Text>
              <Text style={styles.subtitle}>Add more items in your bucket</Text>
            </View>
            <ArrowRight color="white" size={24} />    
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Sub Total</Text>
            <Text style={styles.summaryText}>Rs {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>GST (16%)</Text>
            <Text style={styles.summaryText}>Rs {gst.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.summaryText}>Total</Text>
            <Text style={styles.summaryText}>Rs {total.toFixed(2)}</Text>
          </View>
        </View>

        {/* You May Also Like Section */}
        <View style={styles.recommendedSection}>
          <Text style={styles.recommendedTitle}>You may also like</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedList}
          >
            {recommendedItems.map((item) => (
              <RecommendedItem
                key={item.id}
                item={item}
                onAddToBucket={() => addToBucket({ ...item, quantity: 1 })}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <TouchableOpacity
          style={styles.viewBucketContainer}>
          <View style={styles.bucketLeft}>
            <Image
              source={{ uri: bucketItems[bucketItems.length - 1]?.image }}
              style={styles.bucketItemImage}
            />
            <Text style={styles.viewBucketText}>
              {`${bucketItems?.length} ${
                bucketItems?.length === 1 ? 'item' : 'items'
              }`}
            </Text>
          </View>

          <View style={styles.bucketRight}>
            <Text style={styles.viewBucketText}>
              Rs {total.toFixed(2)}
            </Text>
            <Text style={styles.viewBucketButtonText}>Checkout </Text>
            
          </View>
        </TouchableOpacity>

    
    </SafeAreaView>
  );
}



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
  },
  logo: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  emptyMessage: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  summary: {
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 8,
    marginTop: 8,
  },
  summaryText: {
    color: '#fff',
    fontSize: 14,
  },
  checkoutBar: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: '#e31837',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  checkoutPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  textContainer: {
    flex: 1,
  },
  exploretitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  recommendedSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  recommendedTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  recommendedList: {
    paddingHorizontal: 16,
  },
   viewBucketContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4D0009',
    padding: 10,
  },
  bucketLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
  },
  bucketItemImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  viewBucketText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  bucketRight: {
     padding: 10,  
    width: '70%',
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    borderRadius:7,
   
  },
  viewBucketButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 16,
    fontWeight: 'bold',
  },
});