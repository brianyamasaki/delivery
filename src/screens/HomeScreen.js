import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, Card, Image } from 'react-native-elements';
import LocationForm from '../components/LocationForm';
import { Context as ResultsContext } from '../context/ResultsContext';
import ResultsDetails from '../components/ResultsDetails';
import Map from '../components/Map';

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = React.useState('');
  const { state, fetchResults } = React.useContext(ResultsContext);
  let flatListRef;
  return (
    <View style={styles.containerStyle}>
      <LocationForm
        value={location}
        onChangeText={setLocation}
        onSubmit={() => {
          fetchResults({ location }, 'delivery');
          // flatListRef.scrollToIndex({ index: 0 });
        }}
      />
      {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
      <FlatList
        style={styles.listStyle}
        refreshing={state.refreshing}
        ref={ref => {
          flatListRef = ref;
        }}
        data={state.results}
        keyExtractor={item => item.id}
        horizontal
        renderItem={({ item }) => {
          return <ResultsDetails result={item} />;
        }}
      />
      <Map />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 10
  },
  headerStyle: {
    textAlign: 'center'
  },
  listStyle: {
    // borderColor: 'black',
    // borderWidth: 1,
    height: 240
  }
});

export default HomeScreen;
