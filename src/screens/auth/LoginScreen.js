import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login({ username, password });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Usuario:</Text>
      <TextInput value={username} onChangeText={setUsername} />
      <Text>Contraseña:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}
