import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import LatestUpdates from './src/screens/LatestUpdates';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MangaPreviewScreen from './src/screens/MangaPreview';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator Definition
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Latest Updates':
              iconName = focused ? 'star' : 'star-outline';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#000000' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={ScreenWithSafeArea(HomeScreen)} />
      <Tab.Screen name="Latest Updates" component={ScreenWithSafeArea(LatestUpdates)} />
      <Tab.Screen name="Favorites" component={ScreenWithSafeArea(FavoritesScreen)} />
      <Tab.Screen name="Profile" component={ScreenWithSafeArea(ProfileScreen)} />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="MangaPreview" component={MangaPreviewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

function ScreenWithSafeArea(Component: React.FC) {
  return () => (
    <SafeAreaView style={styles.screenContainer}>
      <Component />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  screenContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 0,
    backgroundColor: '#1a1a1a',
  },
});
