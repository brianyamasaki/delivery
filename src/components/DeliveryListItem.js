import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Image } from 'react-native-elements';
import catch22deliveryApi from '../api/catch22delivery';

const DeliveryListItem = ({ post }) => {
  const [mediaJson, setMediaJson] = React.useState({});
  const [errorMsg, setErrorMsg] = React.useState('');
  const getMediaJson = async () => {
    if (post.mediaLinkUrl) {
      try {
        const response = await catch22deliveryApi(post.mediaLinkUrl);
        setMediaJson(response.data);
      } catch (err) {
        setErrorMsg(err.message);
      }
    } else {
      setErrorMsg('No Image Available');
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
      ) : errorMsg ? (
        <View style={styles.backupTextContainer}>
          <Text style={styles.backupTextStyle}>{post.title}</Text>
        </View>
      ) : (
        <ActivityIndicator size={30} />
      )}
    </View>
  );
};

const WIDTH = 170;
const HEIGHT = 170;

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 2
  },
  headerStyle: {
    textAlign: 'center'
  },
  imageStyle: {
    width: WIDTH,
    height: HEIGHT
  },
  backupTextContainer: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'center'
  },
  backupTextStyle: {
    textAlign: 'center',
    fontSize: 20
  }
});

export default DeliveryListItem;
