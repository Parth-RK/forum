// src/screens/PostDetailsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { RootStackParamList } from '../types';
import { PostCard } from '../components/PostCard';
import { Comment } from '../components/Comment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addComment, toggleLike } from '../redux/slices/postsSlice';

type PostDetailsRouteProp = RouteProp<RootStackParamList, 'PostDetails'>;

export const PostDetailsScreen: React.FC = () => {
  const route = useRoute<PostDetailsRouteProp>();
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');
  
  const post = useSelector((state: RootState) => 
    state.posts.posts.find(p => p.id === route.params.postId)
  );

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (!post) return null;

  const handleAddComment = () => {
    if (!newComment.trim() || !currentUser) return;

    const comment = {
      id: `comment-${Date.now()}`,
      content: newComment,
      user: currentUser,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    dispatch(addComment({ postId: post.id, comment }));
    setNewComment('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.scrollContainer}>
        <PostCard 
          post={post} 
          onLike={() => dispatch(toggleLike(post.id))}
        />
        <View style={styles.commentsSection}>
          {post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleAddComment}
          disabled={!newComment.trim()}
        >
          <MaterialCommunityIcons 
            name="send" 
            size={24} 
            color={newComment.trim() ? '#4A8B57' : '#999'} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flex: 1,
  },
  commentsSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    padding: 8,
  },
});

export default PostDetailsScreen;