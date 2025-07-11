import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VendorNotificationsScreen = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'reminder',
      title: 'Recordatorio de feria',
      message: 'Tu feria "Isla Cautín" abre en 2 horas',
      time: '2 horas',
      read: false,
      icon: 'schedule'
    },
    {
      id: 2,
      type: 'review',
      title: 'Nueva reseña',
      message: 'Carlos Mendoza dejó una reseña de 5 estrellas',
      time: '1 día',
      read: false,
      icon: 'star'
    },
    {
      id: 3,
      type: 'update',
      title: 'Actualización legal',
      message: 'Nuevas regulaciones para vendedores ambulantes',
      time: '3 días',
      read: true,
      icon: 'info'
    },
    {
      id: 4,
      type: 'promotion',
      title: 'Promociona tu feria',
      message: 'Aumenta tu visibilidad con nuestros planes premium',
      time: '1 semana',
      read: true,
      icon: 'trending-up'
    }
  ]);

  const getIconColor = (type) => {
    switch (type) {
      case 'reminder': return '#FF9800';
      case 'review': return '#FFD700';
      case 'update': return '#2196F3';
      case 'promotion': return '#4CAF50';
      default: return '#666';
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={[
      styles.notificationCard,
      !item.read && styles.unreadCard
    ]}>
      <View style={styles.notificationIcon}>
        <Icon 
          name={item.icon} 
          size={24} 
          color={getIconColor(item.type)} 
        />
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={[
          styles.notificationTitle,
          !item.read && styles.unreadTitle
        ]}>
          {item.title}
        </Text>
        <Text style={styles.notificationMessage}>
          {item.message}
        </Text>
        <Text style={styles.notificationTime}>
          Hace {item.time}
        </Text>
      </View>
      
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <TouchableOpacity style={styles.markAllButton}>
          <Text style={styles.markAllText}>Marcar todas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationsList}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  markAllButton: {
    padding: 8,
  },
  markAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  notificationsList: {
    padding: 16,
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginLeft: 8,
    marginTop: 4,
  },
});

export default VendorNotificationsScreen;