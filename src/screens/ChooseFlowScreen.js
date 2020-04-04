import React from 'react';
import { SafeAreaView, View, StyleSheet, AsyncStorage } from 'react-native';
import { Text, Button } from 'react-native-elements';

const ChooseFlowScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.headerStyle} h3>
        Choose Your Flow
      </Text>
      <Text style={styles.explanationStyle}>
        This is the flow using Catch22delivery data
      </Text>
      <Button
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('Delivery')}
        title='Catch-22 Delivery Data'
      />
      <Text style={styles.explanationStyle}>
        This is the flow showing Maps using Yelp data
      </Text>
      <Button
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('Home')}
        title='Yelp Data'
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    textAlign: 'center',
    marginBottom: 20
  },
  explanationStyle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20
  },
  buttonStyle: {
    margin: 10
  }
});

export default ChooseFlowScreen;
