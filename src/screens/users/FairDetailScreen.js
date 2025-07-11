import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FairDetailScreen = ({ route, navigation }) => {
  const { fair } = route.params;
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  
  const [comments] = useState([
    {
      id: 1,
      user: 'Carlos Mendoza',
      avatar: 'https://via.placeholder.com/40x40',
      rating: 5,
      comment: 'Excelente feria, productos frescos y buenos precios',
      date: '2 días atrás',
    },
    {
      id: 2,
      user: 'Ana García',
      avatar: 'https://via.placeholder.com/40x40',
      rating: 4,
      comment: 'Muy buena variedad, aunque a veces está muy lleno',
      date: '1 semana atrás',
    },
    {
      id: 3,
      user: 'Pedro Silva',
      avatar: 'https://via.placeholder.com/40x40',
      rating: 5,
      comment: 'Los vendedores son muy amables y los productos de calidad',
      date: '2 semanas atrás',
    },
  ]);

  const renderStars = (rating, onPress = null) => (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onPress && onPress(star)}
          disabled={!onPress}
        >
          <Icon
            name="star"
            size={20}
            color={star <= rating ? '#FFD700' : '#E0E0E0'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderComment = ({ item }) => (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <Image source={{ uri: item.avatar }} style={styles.commentAvatar} />
        <View style={styles.commentUserInfo}>
          <Text style={styles.commentUser}>{item.user}</Text>
          <View style={styles.commentRating}>
            {renderStars(item.rating)}
            <Text style={styles.commentDate}>{item.date}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.commentText}>{item.comment}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: fair.image }} style={styles.headerImage} />
      
      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{fair.name}</Text>
          <TouchableOpacity style={styles.favoriteButton}>
            <Icon name="favorite-border" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.ratingSection}>
          {renderStars(fair.rating)}
          <Text style={styles.ratingText}>
            {fair.rating} ({fair.reviews} reseñas)
          </Text>
        </View>
        
        <Text style={styles.description}>{fair.description}</Text>
        
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Icon name="schedule" size={20} color="#4CAF50" />
            <Text style={styles.infoText}>{fair.schedule}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="location-on" size={20} color="#4CAF50" />
            <Text style={styles.infoText}>{fair.location}</Text>
          </View>
        </View>
        
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="directions" size={20} color="white" />
            <Text style={styles.actionButtonText}>Cómo llegar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Icon name="share" size={20} color="#4CAF50" />
            <Text style={styles.actionButtonSecondaryText}>Compartir</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.ratingInputSection}>
          <Text style={styles.sectionTitle}>Califica esta feria</Text>
          {renderStars(userRating, setUserRating)}
          
          <TextInput
            style={styles.commentInput}
            placeholder="Escribe tu comentario..."
            value={newComment}
            onChangeText={setNewComment}
            multiline
            numberOfLines={3}
          />
          
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Enviar Reseña</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.commentsSection}>
          <Text style={styles.sectionTitle}>
            Reseñas ({comments.length})
          </Text>
          
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  favoriteButton: {
    padding: 8,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
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
  ratingInputSection: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  commentInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  commentsSection: {
    marginBottom: 20,
  },
  commentCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentUserInfo: {
    flex: 1,
  },
  commentUser: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  commentRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentDate: {
    fontSize: 12,
    color: '#888',
    marginLeft: 8,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default FairDetailScreen;