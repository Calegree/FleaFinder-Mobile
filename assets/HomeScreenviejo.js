import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <View>
      <Text>Hola, {user.username}</Text>
      <Button title="Cerrar sesión" onPress={logout} />
      <Button title="Ir a la pantalla de inicio" onPress={() => navigation.navigate('HomeScreen')} />
    </View>
  );
}
