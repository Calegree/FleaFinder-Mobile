import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import VendorProfileScreen from '../screens/users/VendorProfileScreen';
import MapScreen from '../screens/users/MapScreen';
import VendorNotificationsScreen from '../screens/users/VendorNotificationsScreen';

const Tab = createBottomTabNavigator();

function VendorTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'VendorProfile') {
            iconName = 'person';
          } else if (route.name === 'Map') {
            iconName = 'map';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="VendorProfile" 
        component={VendorProfileScreen} 
        options={{ title: 'Perfil' }} 
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen} 
        options={{ title: 'Mapa' }} 
      />
      <Tab.Screen 
        name="Notifications" 
        component={VendorNotificationsScreen} 
        options={{ title: 'Notificaciones' }} 
      />
    </Tab.Navigator>
  );
}

export default VendorTabNavigator;