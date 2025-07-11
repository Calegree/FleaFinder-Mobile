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
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';
import api from '../../services/api';
import { Picker } from '@react-native-picker/picker';

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

  const [loading, setLoading] = useState(false);

  // Estados para fecha/hora de inicio
  const [startDay, setStartDay] = useState('1');
  const [startMonth, setStartMonth] = useState('1');
  const [startYear, setStartYear] = useState('2024');
  const [startHour, setStartHour] = useState('9');
  const [startMinute, setStartMinute] = useState('0');
  // Estados para fecha/hora de término
  const [endDay, setEndDay] = useState('1');
  const [endMonth, setEndMonth] = useState('1');
  const [endYear, setEndYear] = useState('2024');
  const [endHour, setEndHour] = useState('18');
  const [endMinute, setEndMinute] = useState('0');

  // Actualizar el estado de fecha/hora en fairData cuando cambian los selectores
  React.useEffect(() => {
    const pad = (n) => n.toString().padStart(2, '0');
    setFairData(prev => ({
      ...prev,
      startDate: `${startYear}-${pad(startMonth)}-${pad(startDay)}T${pad(startHour)}:${pad(startMinute)}:00`,
      endDate: `${endYear}-${pad(endMonth)}-${pad(endDay)}T${pad(endHour)}:${pad(endMinute)}:00`,
    }));
  }, [startDay, startMonth, startYear, startHour, startMinute, endDay, endMonth, endYear, endHour, endMinute]);

  const handleInputChange = (field, value) => {
    setFairData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { name, description, address, startDate, endDate } = fairData;
    const { latitude, longitude } = selectedLocation;
    if (!name || !description || !address || !startDate || !endDate) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    setLoading(true);
    try {
      await api.post('/fairs', {
        name,
        description,
        address,
        latitude,
        longitude,
        startDate,
        endDate,
      });
      Alert.alert(
        'Feria Creada',
        'Tu feria ha sido registrada exitosamente y está pendiente de aprobación',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la feria. Intenta nuevamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para pedir permisos y obtener ubicación actual usando expo-location
  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se pudo obtener la ubicación');
        return;
      }
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setSelectedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert('Error', 'No se pudo obtener la ubicación');
    }
  };

  // Helpers para los pickers
  const years = Array.from({ length: 2030 - 2024 + 1 }, (_, i) => (2024 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const hours = Array.from({ length: 24 }, (_, i) => i.toString());
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString());

  // Agrega estilos para los pickers y etiquetas
  const pickerRow = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  };
  const pickerCol = {
    flex: 1,
    alignItems: 'center',
    minWidth: 80,
    paddingVertical: 8, // más espacio vertical
  };
  const pickerLabel = {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
    textAlign: 'center',
  };
  const pickerStyle = {
    width: '100%',
    height: 56, // más alto
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
            <TouchableOpacity style={styles.editLocationButton} onPress={getCurrentLocation}>
              <Icon name="my-location" size={20} color="#4CAF50" />
              <Text style={styles.editLocationText}>Usar mi ubicación</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
              <Text style={{fontSize: 14}}>Lat: {selectedLocation.latitude.toFixed(5)}</Text>
              <Text style={{fontSize: 14}}>Lng: {selectedLocation.longitude.toFixed(5)}</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fecha y hora de inicio (obligatorio)*</Text>
            {/* Día, Mes, Año */}
            <View style={pickerRow}>
              <View style={pickerCol}>
                <Text style={pickerLabel}>Día</Text>
                <Picker
                  selectedValue={startDay}
                  style={pickerStyle}
                  onValueChange={setStartDay}>
                  {days.map(day => <Picker.Item key={day} label={day} value={day} />)}
                </Picker>
              </View>
              <View style={pickerCol}>
                <Text style={pickerLabel}>Mes</Text>
                <Picker
                  selectedValue={startMonth}
                  style={pickerStyle}
                  onValueChange={setStartMonth}>
                  {months.map(month => <Picker.Item key={month} label={month} value={month} />)}
                </Picker>
              </View>
              <View style={pickerCol}>
                <Text style={pickerLabel}>Año</Text>
                <Picker
                  selectedValue={startYear}
                  style={pickerStyle}
                  onValueChange={setStartYear}>
                  {years.map(year => <Picker.Item key={year} label={year} value={year} />)}
                </Picker>
              </View>
            </View>
            {/* Hora, Minuto */}
            <View style={pickerRow}>
              <View style={pickerCol}>
                <Text style={pickerLabel}>Hora</Text>
                <Picker
                  selectedValue={startHour}
                  style={pickerStyle}
                  onValueChange={setStartHour}>
                  {hours.map(hour => <Picker.Item key={hour} label={hour.padStart(2, '0')} value={hour} />)}
                </Picker>
              </View>
              <View style={pickerCol}>
                <Text style={pickerLabel}>Minuto</Text>
                <Picker
                  selectedValue={startMinute}
                  style={pickerStyle}
                  onValueChange={setStartMinute}>
                  {minutes.map(minute => <Picker.Item key={minute} label={minute.padStart(2, '0')} value={minute} />)}
                </Picker>
              </View>
              <View style={{ flex: 1 }} /> {/* Espacio vacío para alinear */}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fecha y hora de término (obligatorio)*</Text>
            {/* Día, Mes, Año */}
            <View style={pickerRow}>
              <View style={pickerCol}>
                <Text style={pickerLabel}>Día</Text>
                <Picker
                  selectedValue={endDay}
                  style={pickerStyle}
                  onValueChange={setEndDay}>
                  {days.map(day => <Picker.Item key={day} label={day} value={day} />)}
                </Picker>
              </View>
              <View style={pickerCol}>
                <Text style={pickerLabel}>Mes</Text>
                <Picker
                  selectedValue={endMonth}
                  style={pickerStyle}
                  onValueChange={setEndMonth}>
                  {months.map(month => <Picker.Item key={month} label={month} value={month} />)}
                </Picker>
              </View>
              <View style={pickerCol}>
                <Text style={pickerLabel}>Año</Text>
                <Picker
                  selectedValue={endYear}
                  style={pickerStyle}
                  onValueChange={setEndYear}>
                  {years.map(year => <Picker.Item key={year} label={year} value={year} />)}
                </Picker>
              </View>
            </View>
            {/* Hora, Minuto */}
            <View style={pickerRow}>
              <View style={pickerCol}>
                <Text style={pickerLabel}>Hora</Text>
                <Picker
                  selectedValue={endHour}
                  style={pickerStyle}
                  onValueChange={setEndHour}>
                  {hours.map(hour => <Picker.Item key={hour} label={hour.padStart(2, '0')} value={hour} />)}
                </Picker>
              </View>
              <View style={pickerCol}>
                <Text style={pickerLabel}>Minuto</Text>
                <Picker
                  selectedValue={endMinute}
                  style={pickerStyle}
                  onValueChange={setEndMinute}>
                  {minutes.map(minute => <Picker.Item key={minute} label={minute.padStart(2, '0')} value={minute} />)}
                </Picker>
              </View>
              <View style={{ flex: 1 }} /> {/* Espacio vacío para alinear */}
            </View>
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.submitButtonText}>{loading ? 'Creando...' : 'Crear feria'}</Text>
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