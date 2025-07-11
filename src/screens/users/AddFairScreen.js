import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddFairScreen = ({ navigation }) => {
  const [fairData, setFairData] = useState({
    name: '',
    description: '',
    address: '',
    startDate: '',
    endDate: '',
  });

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: -38.7359,
    longitude: -72.5904,
  });

  const [region] = useState({
    latitude: -38.7359,
    longitude: -72.5904,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const handleInputChange = (field, value) => {
    setFairData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const { name, description, address, startDate, endDate } = fairData;
    const { latitude, longitude } = selectedLocation;
    if (!name || !description || !address || !startDate || !endDate) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    // Aquí deberías hacer la petición a tu backend con los datos correctos
    // Ejemplo:
    // api.post('/fairs', { ...fairData, latitude, longitude })
    Alert.alert(
      'Feria Creada',
      'Tu feria ha sido registrada exitosamente y está pendiente de aprobación',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agrega una feria</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Por favor, completa la información de la feria.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Nombre de la feria (obligatorio)*
            </Text>
            <TextInput
              style={styles.input}
              value={fairData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder="Ej: Feria de Temuco"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dirección (obligatorio)*</Text>
            <TextInput
              style={styles.input}
              value={fairData.address}
              onChangeText={(text) => handleInputChange('address', text)}
              placeholder="Ingresa la dirección"
            />
          </View>

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              region={region}
              onPress={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
            >
              <Marker coordinate={selectedLocation} />
            </MapView>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
              <Text style={{fontSize: 14}}>Lat: {selectedLocation.latitude.toFixed(5)}</Text>
              <Text style={{fontSize: 14}}>Lng: {selectedLocation.longitude.toFixed(5)}</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fecha y hora de inicio (obligatorio)*</Text>
            <TextInput
              style={styles.input}
              value={fairData.startDate}
              onChangeText={(text) => handleInputChange('startDate', text)}
              placeholder="Ej: 09:00"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fecha y hora de término (obligatorio)*</Text>
            <TextInput
              style={styles.input}
              value={fairData.endDate}
              onChangeText={(text) => handleInputChange('endDate', text)}
              placeholder="Ej: 18:00"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descripción (obligatorio)*</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={fairData.description}
              onChangeText={(text) => handleInputChange('description', text)}
              placeholder="Describe tu feria, productos que vendes, etc."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Crear feria</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#E8F5E8',
    borderBottomWidth: 1,
    borderBottomColor: '#D0E8D0',
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoBox: {
    backgroundColor: '#D0E8D0',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 20,
  },
  form: {
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D0E8D0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  selectInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D0E8D0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 16,
    color: '#333',
  },
  selectPlaceholder: {
    color: '#999',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#D0E8D0',
  },
  pickerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pickerOptionSelected: {
    backgroundColor: '#E8F5E8',
  },
  pickerOptionText: {
    fontSize: 16,
    color: '#333',
  },
  pickerOptionTextSelected: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  mapContainer: {
    marginBottom: 20,
  },
  map: {
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
  },
  editLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  editLocationText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 4,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    backgroundColor: '#E8F5E8',
    borderTopWidth: 1,
    borderTopColor: '#D0E8D0',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddFairScreen;