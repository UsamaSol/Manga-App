import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No favorites yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
  text: {
    fontSize: 16,
    color: '#6200ee',
    fontWeight: 'bold'
  },
});

export default FavoritesScreen;