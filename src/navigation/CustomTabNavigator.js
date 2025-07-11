import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from '../screens/auth/HomeScreen';
import MapScreen from '../screens/users/MapScreen';
import VendorProfileScreen from '../screens/users/VendorProfileScreen';

const Tab = createBottomTabNavigator();

function FloatingAddButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.fabAbsolute}
      onPress={() => navigation.navigate('AddFairScreen')}
      activeOpacity={0.85}
    >
      <View style={styles.fabCircle}>
        <Icon name="add" size={36} color="#388E3C" />
      </View>
    </TouchableOpacity>
  );
}

export default function CustomTabNavigator() {
  return (
    <View style={{ flex: 1 }}>
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
          tabBarIcon: ({ focused }) => {
            if (route.name === 'HomeScreen') {
              return <Icon name="home" size={30} color={focused ? 'black' : 'gray'} />;
            } else if (route.name === 'Profile') {
              return (
                <Image
                  source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    borderWidth: focused ? 2 : 0,
                    borderColor: focused ? '#388E3C' : 'transparent',
                  }}
                />
              );
            } else if (route.name === 'MapScreen') {
              return <Icon name="place" size={30} color={focused ? 'black' : 'gray'} />;
            }
          },
        })}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="MapScreen" component={MapScreen} />
        <Tab.Screen name="VendorProfileScreen" component={VendorProfileScreen} />
      </Tab.Navigator>
      <FloatingAddButton />
    </View>
  );
}

const styles = StyleSheet.create({
  fabAbsolute: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    zIndex: 10,
  },
  fabCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
});
