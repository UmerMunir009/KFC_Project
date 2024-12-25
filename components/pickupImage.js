import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';

export default function pickupImage() {
  return (
     <View style={{ padding: 20 }}>
        <Image style={{ width: '100%', height: 200, }}

          source={{
            uri: 'https://www.kfcpakistan.com/static/media/pickup-banner.01fde5a7db5ef06f7bce.png',
          }}
        />
      </View>
  );
}

