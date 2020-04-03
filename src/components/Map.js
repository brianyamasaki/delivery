import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Context as ResultsContext } from '../context/ResultsContext';

const chooseInitialRegion = results => {
  let latMin;
  let latMax;
  let longMin;
  let longMax;
  results.forEach((item, i) => {
    const { latitude, longitude } = item.coordinates;
    if (i === 0) {
      latMin = latMax = latitude;
      longMin = longMax = longitude;
    } else {
      latMin = Math.min(latMin, latitude);
      latMax = Math.max(latMax, latitude);
      longMin = Math.min(longMin, longitude);
      longMax = Math.max(longMax, longitude);
    }
  });
  return {
    latMin,
    latMax,
    longMin,
    longMax,
    latCenter: (latMin + latMax) / 2,
    longCenter: (longMin + longMax) / 2
  };
};

const getResultRegion = results => {
  if (results.length === 1) {
    const { longitude, latitude } = results[0];
    return {
      longitude,
      latitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
  } else {
    const coordStats = chooseInitialRegion(results);
    const latDelta = (coordStats.latMax - coordStats.latMin) * 1.5;
    const longDelta = (coordStats.longMax - coordStats.longMin) * 1.5;
    return {
      longitude: coordStats.longCenter,
      latitude: coordStats.latCenter,
      latitudeDelta: Math.max(latDelta, longDelta),
      longitudeDelta: Math.max(latDelta, longDelta)
    };
  }
};

const Map = () => {
  const navigation = useNavigation();
  const { state } = React.useContext(ResultsContext);

  if (state.results.length === 0) {
    return null;
  }
  const region = getResultRegion(state.results);

  return (
    <MapView
      style={styles.mapStyle}
      initialRegion={region}
      region={region}
      onMarkerPress={event =>
        navigation.navigate('Details', { id: event.nativeEvent.id })
      }
    >
      {state.results.map(item => {
        return (
          <Marker
            title={item.name}
            key={item.id}
            coordinate={item.coordinates}
            identifier={item.id}
          />
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    height: 300
  }
});

export default Map;
