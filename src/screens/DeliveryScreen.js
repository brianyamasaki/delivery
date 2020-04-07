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
import PostsList from '../components/PostsList';
import deliveryApi from '../api/catch22delivery';
import { Context as CategoriesContext } from '../context/CategoryContext';

const DeliveryScreen = () => {
  const { state } = React.useContext(CategoriesContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Categories style={styles.categoryStyles} />
      <PostsList catState={state} />
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
