import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Image } from 'react-native-elements';
import catch22deliveryApi from '../api/catch22delivery';

const DeliveryListItem = ({ post }) => {
  const [mediaJson, setMediaJson] = React.useState({});
  const [errorMsg, setErrorMsg] = React.useState('');
  const getMediaJson = async () => {
    try {
      const response = await catch22deliveryApi(post.mediaLinkUrl);
      setMediaJson(response.data);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };
  React.useEffect(() => {
    getMediaJson();
  }, []);
  return (
    <View style={styles.containerStyle}>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      {mediaJson.media_details ? (
        <Image
          source={{ uri: mediaJson.media_details.sizes.full.source_url }}
          style={styles.imageStyle}
        />
      ) : (
        <ActivityIndicator size={30} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 2
  },
  headerStyle: {
    textAlign: 'center'
  },
  imageStyle: {
    width: 170,
    height: 170
  }
});

export default DeliveryListItem;
