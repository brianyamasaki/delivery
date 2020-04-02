import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

const LocationForm = ({ value, onChangeText, onSubmit }) => {
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  return (
    <View style={styles.containerStyle}>
      <Input
        autoCorrect={false}
        placeholder='Enter Location'
        value={value}
        blurOnSubmit
        onChangeText={value => {
          setButtonDisabled(false);
          onChangeText(value);
        }}
      />
      <Button
        title='Set Location'
        onPress={() => {
          setButtonDisabled(true);
          onSubmit(value);
        }}
        disabled={buttonDisabled}
        style={styles.buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 5
  },
  buttonStyle: {
    marginTop: 10
  }
});

export default LocationForm;
