import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Dashboard = () => {
  const [description, setDescription] = useState('');

  const saveChanges = () => {
    if (!description) {
      Alert.alert('Empty Field', 'Please enter a description.');
    } else {
      Alert.alert('Changes Saved', 'Your changes have been saved.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Description"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={saveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111111',
  },
  input: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    color: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
