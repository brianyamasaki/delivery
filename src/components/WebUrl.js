import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Linking } from 'expo';

const WebUrl = ({ url, style }) => {
  const openUrl = number => {
    Linking.canOpenURL(number)
      .then(supported => {
        if (!supported) {
          console.log('link error');
        } else {
          Linking.openURL(number);
        }
      })
      .catch(err => console.error(err.message));
  };

  return (
    <TouchableOpacity onPress={() => openUrl(url)}>
      <Text style={style}>Open Website</Text>
    </TouchableOpacity>
  );
};

export default WebUrl;
