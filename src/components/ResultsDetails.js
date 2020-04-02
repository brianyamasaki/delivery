import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ResultsDetail = ({ result }) => {
  return (
    <View style={styles.viewStyle}>
      <Image style={styles.imageStyle} source={{ uri: result.image_url }} />
      <Text style={styles.nameStyle}>{result.name}</Text>
      {result.location.display_address.map((line, i) => (
        <Text key={i.toString()}>{line}</Text>
      ))}
      <Text>Phone: {result.phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginLeft: 15
  },
  imageStyle: {
    width: 250,
    height: 150,
    borderRadius: 4,
    marginBottom: 5
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 14
  }
});

export default ResultsDetail;
