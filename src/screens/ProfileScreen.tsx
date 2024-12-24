import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import { supabase } from '../lib/supabaseClient';
import Dashboard from './Dashboard';

const ProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      Alert.alert('Login Successful', `Welcome, ${data.user?.email}`);
      <Dashboard />
    }
  };

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: username,
      password,
    });

    if (error) {
      Alert.alert('Signup Error', error.message);
    } else {
      Alert.alert('Signup Successful', `Welcome, ${data.user?.email}`);
      <Dashboard />
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')} // Replace with your logo file
          style={styles.logo}
        />
        <Text style={styles.appTitle}>Asura Scans</Text>
        <Text style={styles.subTitle}>Login to your account</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.optionsContainer}>
        <TouchableOpacity>
          <Text style={styles.rememberMeText}>Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={isLogin ? handleLogin : handleSignup}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Signup'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin ? (
            <>
              Not a member? <Text style={styles.highlightedText}>Create New Account</Text>
            </>
          ) : (
            <>
              Already have an account? <Text style={styles.highlightedText}>Login</Text>
            </>
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#111111',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  subTitle: {
    color: '#888',
    fontSize: 14,
    marginTop: 5,
  },
  input: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
    color: '#fff',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rememberMeText: {
    color: '#888',
  },
  forgotPasswordText: {
    color: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  highlightedText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
