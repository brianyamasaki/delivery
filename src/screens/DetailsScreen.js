import * as React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Context as ResultsContext } from '../context/ResultsContext';
import PhoneNumber from '../components/PhoneNumber';
import WebUrl from '../components/WebUrl';
import yelp from '../api/yelp';

const DetailsScreen = ({ route, navigation }) => {
  const [result, setResult] = React.useState(null);
  const { id } = route.params;
  let errorMessage = '';

  const getResult = async id => {
    try {
      const response = await yelp.get(`/${id}`);
      setResult(response.data);
    } catch (err) {}
  };

  React.useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return (
      <View>
        {errorMessage ? <Text>Something bad happened...</Text> : null}
      </View>
    );
  }
  return (
    <View>
      <Text h3 style={styles.headerStyle}>
        {result.name}
      </Text>
      {result.location.display_address.map((line, i) => {
        return (
          <Text style={styles.addressStyle} key={i.toString()}>
            {line}
          </Text>
        );
      })}
      {result.display_phone ? (
        <PhoneNumber
          style={styles.addressStyle}
          phoneNumber={result.display_phone}
        />
      ) : null}
      {result.url ? (
        <WebUrl style={styles.addressStyle} url={result.url} />
      ) : null}
      <FlatList
        data={result.photos}
        horizontal
        keyExtractor={photoUrl => photoUrl}
        renderItem={({ item }) => {
          return <Image source={{ uri: item }} style={styles.photoStyle} />;
        }}
      />
      {result.transactions
        ? result.transactions.map((type, i) => (
            <Text key={i} style={styles.transactionStyle}>
              Offers {type}
            </Text>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 3
  },
  addressStyle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 2
  },
  photoStyle: {
    width: 300,
    height: 200
  },
  transactionStyle: {
    textAlign: 'center',
    fontSize: 18
  }
});

export default DetailsScreen;
