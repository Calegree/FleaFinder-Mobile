import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleRedirectToHome = () => {
    navigation.navigate("Home");
  };

  const handleRedirectToMapScreen = () => {
    navigation.navigate("MapScreen");
  };

  const handleRedirectToFairDetail = () => {
    navigation.navigate("FairDetail", {
      fair: {
        name: "Ejemplo Feria",
        image: "https://via.placeholder.com/300x200",
        rating: 4.5,
        reviews: 10,
        description: "Descripción de ejemplo",
        schedule: "Lunes a Viernes 8:00 - 18:00",
        location: "Ubicación de ejemplo",
      },
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Usuario:</Text>
      <TextInput value={username} onChangeText={setUsername} />
      <Text>Contraseña:</Text>
         <Text>Usuario:</Text>
      <TextInput value={username} onChangeText={setUsername} />
      <Text>Contraseña:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Iniciar sesión" onPress={handleRedirectToHome} />
      <Button
        title="Ir a FairDetailScreen"
        onPress={handleRedirectToFairDetail}
      />
      <Button title="Ir a Mapa" onPress={handleRedirectToMapScreen} />
    </View>
  );
}
