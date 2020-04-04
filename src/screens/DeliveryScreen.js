import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Text } from 'react-native-elements';
import Categories from '../components/Categories';
import deliveryApi from '../api/catch22delivery';
import DeliveryListItem from '../components/DeliveryListItem';

const DeliveryScreen = () => {
  const [posts, setPosts] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState('');

  const getPosts = async () => {
    try {
      const response = await deliveryApi.get('/posts', {
        params: {
          per_page: 20
        }
      });
      setPosts(response.data);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };
  React.useEffect(() => {
    getPosts();
  }, []);

  if (posts.length === 0) {
    return <ActivityIndicator size={30} />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Categories style={styles.categoryStyles} />
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      <FlatList
        horizontal
        data={posts}
        keyExtractor={post => post.slug}
        renderItem={({ item }) => {
          return <DeliveryListItem post={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center'
  },
  categoryStyles: {
    margin: 10
  }
});

export default DeliveryScreen;
