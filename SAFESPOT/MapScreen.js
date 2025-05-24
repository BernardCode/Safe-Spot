import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const shelters = [
  {
    id: 1,
    name: 'Downtown Shelter',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: 2,
    name: 'Community Center',
    latitude: 37.7849,
    longitude: -122.4094,
  },
];


export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Getting location...</Text>
      </View>
    );
  }

return (
  <MapView
    style={styles.map}
    region={{
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
  >
    <Marker
      coordinate={location}
      title="You are here"
      description="Current Location"
    />
    
    {shelters.map((shelter) => (
      <Marker
        key={shelter.id}
        coordinate={{ latitude: shelter.latitude, longitude: shelter.longitude }}
        title={shelter.name}
        pinColor="blue"
      />
    ))}
  </MapView>
);
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});