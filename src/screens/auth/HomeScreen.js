import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import feriaImage from '../../../assets/images.jpg';
import pulgasImage from '../../../assets/pulgas.jpeg';

const HomeScreen = ({ navigation }) => {
  const [fairs, setFairs] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Simular datos de ferias
    setFairs([
      {
        id: 1,
        name: 'Feria Isla Cautín',
        description: 'Feria semanal con productos artesanales y gastronómicos',
        address: 'Isla Cautín 1, Temuco, Chile',
        latitude: -33.4489,
        longitude: -70.6693,
        startDate: '2024-01-15T09:00:00',
        endDate: '2024-01-15T18:00:00',
        image: 'https://via.placeholder.com/300x200',
      },
      {
        id: 2,
        name: 'Mercado Central',
        description: 'Mercado tradicional con productos locales',
        address: 'Santiago Centro, Santiago, Chile',
        latitude: -33.4372,
        longitude: -70.6506,
        startDate: '2024-02-10T08:00:00',
        endDate: '2024-02-10T17:00:00',
        image: 'https://via.placeholder.com/300x200',
      }
    ]);
  }, []);

  // Agregar función para formatear fecha
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const renderFairCard = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('FairDetail', { fair: item })}
    >
      <Image source={index === 1 ? pulgasImage : feriaImage} style={styles.fairImage} />
      <View style={styles.cardContent}>
        <Text style={styles.fairName}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.location}>{item.address}</Text>
        <Text style={styles.schedule}>Inicio: {formatDate(item.startDate)}</Text>
        <Text style={styles.schedule}>Término: {formatDate(item.endDate)}</Text>
        <Text style={styles.schedule}>Lat: {item.latitude} | Lng: {item.longitude}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FleaFinder</Text>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Busca aquí..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      
      <FlatList
        data={fairs}
        renderItem={(props) => renderFairCard({ ...props, index: props.index })}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer, { paddingBottom: 100 }]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
  },
  fairImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  fairName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  schedule: {
    fontSize: 12,
    color: '#888',
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
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;