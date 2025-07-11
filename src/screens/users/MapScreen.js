import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';
import api from '../../services/api';

const MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: -38.7359,
    longitude: -72.5904,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const [selectedFair, setSelectedFair] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fairs, setFairs] = useState([]);

  useEffect(() => {
    api.get('/fairs')
      .then(response => setFairs(response.data))
      .catch(error => console.error(error));
  }, []);

  const openFairModal = (fair) => {
    setSelectedFair(fair);
    setModalVisible(true);
  };

  // Función para formatear fecha DD-MM-YYYY
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const renderFairModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Icon name="close" size={24} color="#666" />
          </TouchableOpacity>
          {selectedFair && (
            <ScrollView>
              <Image 
                source={{ uri: selectedFair.image || 'https://via.placeholder.com/300x200' }} 
                style={styles.modalImage} 
              />
              <View style={styles.modalInfo}>
                <Text style={styles.modalTitle}>{selectedFair.name}</Text>
                <Text style={styles.description}>{selectedFair.description}</Text>
                <Text style={styles.schedule}>Dirección: {selectedFair.address}</Text>
                <Text style={styles.schedule}>Inicio: {formatDate(selectedFair.startDate)}</Text>
                <Text style={styles.schedule}>Término: {formatDate(selectedFair.endDate)}</Text>
                <Text style={styles.schedule}>Lat: {selectedFair.latitude} | Lng: {selectedFair.longitude}</Text>
                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate('FairDetail', { fair: selectedFair });
                    }}
                  >
                    <Icon name="info" size={20} color="white" />
                    <Text style={styles.actionButtonText}>Ver Detalles</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  // Función para centrar el mapa en la ubicación actual
  const centerOnUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso denegado para acceder a la ubicación');
        return;
      }
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (err) {
      alert('No se pudo obtener la ubicación');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={setRegion}
      >
        {fairs.map((fair) => (
          <Marker
            key={fair.id}
            coordinate={{
              latitude: parseFloat(fair.latitude),
              longitude: parseFloat(fair.longitude),
            }}
            onPress={() => openFairModal(fair)}
          >
            <View style={styles.markerContainer}>
              <Icon name="store" size={24} color="#4CAF50" />
            </View>
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{fair.name}</Text>
                <Text style={styles.calloutRating}>⭐ {fair.averageRating ?? 0}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      
      {/* Eliminar el botón de filtros */}
      
      {renderFairModal()}
      <TouchableOpacity style={styles.fabLocation} onPress={centerOnUserLocation}>
        <Icon name="my-location" size={28} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  calloutContainer: {
    padding: 8,
    minWidth: 120,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  calloutRating: {
    fontSize: 12,
    color: '#666',
  },
  filterContainer: {
    position: 'absolute',
    top: 50,
    right: 16,
  },
  filterButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  modalInfo: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
  schedule: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  productsContainer: {
    marginBottom: 20,
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  productTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  productTagText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
  },
  actionButtonSecondary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: 'center',
  },
  actionButtonSecondaryText: {
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 4,
  },
  fabLocation: {
    position: 'absolute',
    bottom: 90,
    left: 24,
    backgroundColor: 'white',
    borderRadius: 32,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default MapScreen;