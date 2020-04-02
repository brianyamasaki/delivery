import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.containerStyle}
      onPress={() => navigation.navigate('Home')}
    >
      <ImageBackground
        source={require('../../assets/seaside-overlook.jpg')}
        style={styles.imageStyle}
      >
        <Text style={styles.textStyle}>Welcome to Delivery</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  textStyle: {
    fontSize: 28,
    color: 'white'
  }
});

export default SplashScreen;
