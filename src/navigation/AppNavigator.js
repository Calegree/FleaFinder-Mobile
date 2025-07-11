import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/auth/HomeScreen';
import FairDetailScreen from '../screens/users/FairDetailScreen';
import MapScreen from '../screens/users/MapScreen';
import VendorTabNavigator from './VendorTabNavigator';
import EditVendorProfileScreen from '../screens/users/EditVendorProfileScreen';
import VendorNotificationsScreen from '../screens/users/VendorNotificationsScreen';
import VendorProfileScreen from '../screens/users/VendorProfileScreen';
import AddFairScreen from '../screens/users/AddFairScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import CustomTabNavigator from './CustomTabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        user.role === 'vendor' ? (
          <Stack.Screen name="UserTabs" component={CustomTabNavigator} />
        ) : (
          <Stack.Screen name="VendorTabs" component={VendorTabNavigator} />
        )
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      )}
      <Stack.Screen name="AddFairScreen" component={AddFairScreen} />
    </Stack.Navigator>
  );
}
