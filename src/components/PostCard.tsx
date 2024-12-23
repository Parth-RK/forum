// src/components/PostCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Post } from '../types';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { format } from 'date-fns';
import { RootStackParamList } from '../types'; // Assuming you have a RootStackParamList type

interface PostCardProps {
  post: Post;
  onLike: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.contentContainer}
        onPress={() => navigation.navigate('PostDetails', { postId: post.id })}
      >
        <View style={styles.header}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View style={styles.headerText}>
            <Text>{post.user.name}</Text>
            <Text>{format(new Date(post.createdAt), 'MMM dd, yyyy')}</Text>
          </View>
        </View>
        <Text style={styles.body}>{post.content}</Text>
        <View style={styles.footer}>
          <TouchableOpacity onPress={onLike}>
            <MaterialCommunityIcons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  contentContainer: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  body: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});