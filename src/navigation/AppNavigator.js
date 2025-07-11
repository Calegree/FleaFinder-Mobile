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

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="FairDetail" component={FairDetailScreen} />
      <Stack.Screen name="EditVendorProfileScreen" component={EditVendorProfileScreen} />
      <Stack.Screen name="VendorNotificationsScreen" component={VendorNotificationsScreen} />
      <Stack.Screen name="VendorProfileScreen" component={VendorProfileScreen} />
      <Stack.Screen name="AddFairScreen" component={AddFairScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen 
        name="VendorTabs" 
        component={() => <VendorTabNavigator />}
      />
    </Stack.Navigator>
  );
}
