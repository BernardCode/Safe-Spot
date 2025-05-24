import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapScreen from './MapScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MapScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});