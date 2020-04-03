import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Linking } from 'expo';

const PhoneNumber = ({ phoneNumber, style }) => {
  const callNumber = number => {
    Linking.canOpenURL(number)
      .then(supported => {
        if (!supported) {
          console.log('Call error');
        } else {
          Linking.openURL(number);
        }
      })
      .catch(err => console.error(err.message));
  };

  return (
    <TouchableOpacity onPress={() => callNumber(phoneNumber)}>
      <Text style={style}>{phoneNumber}</Text>
    </TouchableOpacity>
  );
};

export default PhoneNumber;
