// src/screens/ForumScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PostCard } from '../components/PostCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { setPosts, toggleLike } from '../redux/slices/postsSlice';
import { Post, RootStackParamList } from '../types';
import mockPosts from '../mockData';
import { RootState } from '../redux/store'; // Assuming you have a RootState type

export const ForumScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const [loading, setLoading] = useState(false);
  
  // Filter posts based on current tab
  const filteredPosts = posts.filter(
    post => post.category.toLowerCase() === route.name.toLowerCase()
  );

  useEffect(() => {
    // Simulated data fetch
    setLoading(true);
    // Replace with actual API call
    setTimeout(() => {
      dispatch(setPosts(mockPosts));
      setLoading(false);
    }, 1000);
  }, [dispatch]);

  const handleLike = (postId: string) => {
    dispatch(toggleLike(postId));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{route.name}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPost')}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#4A8B57" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }: { item: Post }) => (
    <PostCard post={item} onLike={() => handleLike(item.id)} />
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={filteredPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 5,
  },
});

export default ForumScreen;