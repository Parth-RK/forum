// src/components/Comment.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Comment as CommentType } from '../types';
import { format } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CommentProps {
  comment: CommentType;
  onLike?: () => void;
}

export const Comment: React.FC<CommentProps> = ({ comment, onLike }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: comment.user.avatar }} style={styles.avatar} />
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{comment.user.name}</Text>
        <Text style={styles.content}>{comment.content}</Text>
        <View style={styles.footer}>
          <Text style={styles.timestamp}>
            {format(new Date(comment.createdAt), 'MMM d, yyyy')}
          </Text>
          <View style={styles.likes}>
            <MaterialCommunityIcons 
              name="heart-outline" 
              size={16} 
              color="#666" 
              onPress={onLike}
            />
            <Text style={styles.likesCount}>{comment.likes}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginRight: 16,
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

