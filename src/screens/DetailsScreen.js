import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Context as ResultsContext } from '../context/ResultsContext';
import PhoneNumber from '../components/PhoneNumber';
import WebUrl from '../components/WebUrl';

const DetailsScreen = ({ route, navigation }) => {
  const { state } = React.useContext(ResultsContext);
  const { id } = route.params;

  if (state.results.length === 0) return null;

  const result = state.results.find(result => result.id === id);
  console.log(result);
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
  }
});

export default DetailsScreen;
