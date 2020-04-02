import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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

const Map = () => {
  const { state } = React.useContext(ResultsContext);

  if (state.results.length === 0) {
    return null;
  }
  const coordStats = chooseInitialRegion(state.results);
  const latDelta = (coordStats.latMax - coordStats.latMin) * 2;
  const longDelta = (coordStats.longMax - coordStats.longMin) * 2;
  const initialRegion = {
    longitude: coordStats.longCenter,
    latitude: coordStats.latCenter,
    latitudeDelta: Math.max(latDelta, longDelta),
    longitudeDelta: Math.max(latDelta, longDelta)
  };

  return (
    <MapView style={styles.mapStyle} initialRegion={initialRegion}>
      {state.results.map(item => {
        return (
          <Marker
            title={item.name}
            key={item.id}
            coordinate={item.coordinates}
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
