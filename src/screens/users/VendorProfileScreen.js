import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VendorProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('publications');
  
  const [vendorData] = useState({
    name: 'Jimena Zandria',
    username: 'jimenazandria2031',
    rut: '12345678-9',
    birthday: '1990-05-15',
    email: 'jimena@email.com',
    phoneNumber: '+56912345678',
    avatar: 'https://via.placeholder.com/100x100',
    // Puedes agregar más campos reales del backend aquí
    fairs: [], // Si tienes ferias favoritas o propias
  });

  const renderPublication = ({ item }) => (
    <View style={styles.publicationCard}>
      <View style={styles.publicationHeader}>
        <Image source={{ uri: vendorData.avatar }} style={styles.userAvatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{vendorData.username}</Text>
          <Text style={styles.publicationDate}>{item.date}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="more-vert" size={20} color="#666" />
        </TouchableOpacity>
      </View>
      
      <Image source={{ uri: item.image }} style={styles.publicationImage} />
      
      <View style={styles.publicationContent}>
        <Text style={styles.publicationDescription}>{item.description}</Text>
        
        <View style={styles.publicationActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="favorite-border" size={20} color="#666" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="comment" size={20} color="#666" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer?.()}
        >
          <Icon name="menu" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{vendorData.username}</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="settings" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image source={{ uri: vendorData.avatar }} style={styles.profileAvatar} />
          <Text style={styles.profileName}>{vendorData.name}</Text>
          <Text style={styles.profileField}>Usuario: {vendorData.username}</Text>
          <Text style={styles.profileField}>RUT: {vendorData.rut}</Text>
          <Text style={styles.profileField}>Fecha de nacimiento: {vendorData.birthday}</Text>
          <Text style={styles.profileField}>Email: {vendorData.email}</Text>
          <Text style={styles.profileField}>Teléfono: {vendorData.phoneNumber}</Text>
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => navigation.navigate('EditVendorProfile')}
          >
            <Text style={styles.editProfileText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{vendorData.fairs.length}</Text>
            <Text style={styles.statLabel}>Ferias</Text>
          </View>
        </View>
        {/* Puedes dejar la sección de ferias, pero si no hay datos muestra un mensaje */}
        <View style={styles.fairsSection}>
          {vendorData.fairs.length === 0 ? (
            <Text style={styles.emptyText}>Aquí aparecerán tus ferias registradas</Text>
          ) : (
            // Aquí podrías mapear las ferias si las tienes
            vendorData.fairs.map(fair => (
              <View key={fair.id} style={styles.fairCard}>
                <Text>{fair.name}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  editProfileButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  profileField: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#4CAF50',
  },
  publicationsList: {
    paddingBottom: 20,
  },
  publicationCard: {
    backgroundColor: 'white',
    marginBottom: 8,
  },
  publicationHeader: {
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
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  publicationDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  publicationImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  publicationContent: {
    padding: 12,
  },
  publicationDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  publicationActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  fairsSection: {
    padding: 16,
  },
  addFairButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  addFairText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 40,
  },
  fairCard: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default VendorProfileScreen;