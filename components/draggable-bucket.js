import React, { useRef } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBucket } from '../BucketContext';

export default function Component() {
  const pan = useRef(new Animated.ValueXY()).current;
  const { itemCount, setItemCount } = useBucket();

  const navigation = useNavigation();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        // Keep the bucket within screen bounds
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bucketContainer,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}>
        <TouchableOpacity
          style={styles.bucket}
          onPress={() => {
            if (itemCount === 0) {
              navigation.navigate('ViewAll'); // Navigate to the ViewAll screen
            } else {
              navigation.navigate('Bucket');
            }
          }}>
          <ImageBackground
            source={{
              uri: 'https://kfcmerchstore.com.au/cdn/shop/files/MicrosoftTeams-image_26.jpg?v=1701431234',
            }}
            style={styles.bucketImage}
            imageStyle={{ borderRadius: 30 }} // Ensures the image matches the bucket shape
          >
            {itemCount >= 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{itemCount}</Text>
              </View>
            )}
          </ImageBackground>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  bucketContainer: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    zIndex: 1000,
  },
  bucket: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bucketImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E4002B',
  },
  badgeText: {
    color: '#E4002B',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 6,
  },
});
