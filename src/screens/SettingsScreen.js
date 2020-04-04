import React from 'react';
import { SafeAreaView, StyleSheet, Settings, AsyncStorage } from 'react-native';
import { Text, Button } from 'react-native-elements';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text h3 style={styles.headerStyle}>
        Mostly Debug
      </Text>
      <Button
        title='Erase Category store'
        style={styles.buttonStyle}
        onPress={async () => await AsyncStorage.removeItem('categoryObject')}
      />
      <Button
        title='Erase Other store'
        style={styles.buttonStyle}
        onPress={async () => await AsyncStorage.removeItem('categoryObject')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    textAlign: 'center'
  },
  buttonStyle: {
    margin: 15
  }
});

export default SettingsScreen;
