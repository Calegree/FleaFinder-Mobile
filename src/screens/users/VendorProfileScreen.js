import React, { useState, useEffect, useContext } from 'react';
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
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const VendorProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('publications');
  const [vendorData, setVendorData] = useState(null);

  // Formatear fecha a DD-MM-YYYY
  function formatDateDMY(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    // Determinar el id según el rol
    let userId = 7; // vendedor por defecto
    if (user?.role === 'buyer') userId = 8;
    api.get(`/users/${userId}`)
      .then(res => setVendorData(res.data))
      .catch(err => console.error(err));
  }, [user]);

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
      {/* Eliminar header superior con menú y engranaje */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSectionEnhanced}>
          <Image source={{ uri: 'https://via.placeholder.com/100x100' }} style={styles.profileAvatar} />
          <Text style={styles.profileName}>{vendorData?.name || ''}</Text>
          <View style={styles.profileCard}><Text style={styles.profileFieldLabel}>Usuario:</Text><Text style={styles.profileFieldValue}>{vendorData?.username || ''}</Text></View>
          <View style={styles.profileCard}><Text style={styles.profileFieldLabel}>RUT:</Text><Text style={styles.profileFieldValue}>{vendorData?.rut || ''}</Text></View>
          <View style={styles.profileCard}><Text style={styles.profileFieldLabel}>Fecha de nacimiento:</Text><Text style={styles.profileFieldValue}>{formatDateDMY(vendorData?.birthday)}</Text></View>
          <View style={styles.profileCard}><Text style={styles.profileFieldLabel}>Email:</Text><Text style={styles.profileFieldValue}>{vendorData?.email || ''}</Text></View>
          <View style={styles.profileCard}><Text style={styles.profileFieldLabel}>Teléfono:</Text><Text style={styles.profileFieldValue}>{vendorData?.phoneNumber || ''}</Text></View>
          <TouchableOpacity 
            style={[styles.editProfileButton, { marginTop: 32 }]}
            onPress={() => navigation.navigate('EditVendorProfile')}
          >
            <Text style={styles.editProfileText}>Editar perfil</Text>
          </TouchableOpacity>
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
  profileSectionEnhanced: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#E8F5E8',
    marginBottom: 8,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  profileFieldLabel: {
    fontWeight: 'bold',
    color: '#4CAF50',
    fontSize: 15,
  },
  profileFieldValue: {
    color: '#333',
    fontSize: 15,
    flexShrink: 1,
    textAlign: 'right',
  },
});

export default VendorProfileScreen;