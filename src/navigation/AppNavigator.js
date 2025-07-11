import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/auth/HomeScreen';
import FairDetailScreen from '../screens/users/FairDetailScreen';
import MapScreen from '../screens/users/MapScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="FairDetail" component={FairDetailScreen} />
    </Stack.Navigator>
  );
}
