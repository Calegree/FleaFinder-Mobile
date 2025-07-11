import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import VendorProfileScreen from '../screens/users/VendorProfileScreen';
import MapScreen from '../screens/users/MapScreen';
import VendorNotificationsScreen from '../screens/users/VendorNotificationsScreen';
import HomeScreen from '../screens/auth/HomeScreen';

const Tab = createBottomTabNavigator();

function VendorTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#A8E6A1',
          height: 70,
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'HomeScreen') {
            return <Icon name="home" size={30} color={focused ? 'black' : 'gray'} />;
          } else if (route.name === 'Map') {
            return <Icon name="place" size={30} color={focused ? 'black' : 'gray'} />;
          } else if (route.name === 'VendorProfile') {
            return <Icon name="person" size={30} color={focused ? 'black' : 'gray'} />;
          }
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="VendorProfile" component={VendorProfileScreen} />
    </Tab.Navigator>
  );
}

export default VendorTabNavigator;