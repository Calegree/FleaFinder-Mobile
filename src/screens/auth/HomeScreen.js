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

const HomeScreen = ({ navigation }) => {
  const [fairs, setFairs] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Simular datos de ferias
    setFairs([
      {
        id: 1,
        name: 'Feria Isla Cautín',
        image: 'https://via.placeholder.com/300x200',
        rating: 5.0,
        reviews: 29,
        description: 'Excelente feria con gran variedad de productos frescos',
        user: 'robertogarcia92',
        likes: 245,
        comments: 4,
        location: 'Temuco, Chile',
        schedule: 'Sábados 8:00 - 18:00'
      },
      {
        id: 2,
        name: 'Mercado Central',
        image: 'https://via.placeholder.com/300x200',
        rating: 4.5,
        reviews: 156,
        description: 'Mercado tradicional con productos locales',
        user: 'mariaperez',
        likes: 189,
        comments: 12,
        location: 'Santiago, Chile',
        schedule: 'Lunes a Domingo 7:00 - 20:00'
      }
    ]);
  }, []);

  const renderFairCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('FairDetail', { fair: item })}
    >
      <View style={styles.cardHeader}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/40x40' }} 
          style={styles.userAvatar} 
        />
        <Text style={styles.username}>{item.user}</Text>
      </View>
      
      <Image source={{ uri: item.image }} style={styles.fairImage} />
      
      <View style={styles.cardContent}>
        <Text style={styles.fairName}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.schedule}>{item.schedule}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                name="star"
                size={16}
                color={star <= item.rating ? '#FFD700' : '#E0E0E0'}
              />
            ))}
          </View>
          <Text style={styles.ratingText}>{item.rating} ({item.reviews})</Text>
        </View>
        
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="favorite-border" size={20} color="#666" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="comment" size={20} color="#666" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
        </View>
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
        renderItem={renderFairCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
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